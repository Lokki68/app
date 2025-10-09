"use client";

import MapView from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateEvent } from "@/lib/db/serverActions/eventServerActions";
import EventType from "@/lib/types/event";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type FormEventParams = {
  event: EventType;
};

const FormEvent = ({ event }: FormEventParams) => {
  const [address, setAddress] = useState(event.address);
  const [coords, setCoords] = useState({
    lat: Number(event.location.coordinates[1]),
    lon: Number(event.location.coordinates[0]),
  });

  const defaultDate = new Date(event.date).toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    if (coords) {
      formData.append("lat", coords.lat.toString());
      formData.append("lon", coords.lon.toString());
    }

    if (!event._id) {
      console.error("L'identifiant de l'événement est manquant.");
      return;
    }

    const result = await updateEvent(event._id.toString(), formData);

    if (result.success) {
      toast.success("Evenement mis à jour avec succès !");
      redirect(`/events/${result.slug}`);
    } else {
      toast.error("Une erreur est survenue!");
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );

    const data = await res.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      setCoords({ lat, lon });
    } else {
      toast.error("Adresse non trouvée");
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Titre</Label>
        <Input id="title" name="title" defaultValue={event.title} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Date</Label>
        <Input id="date" name="date" type="date" defaultValue={defaultDate} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Description de l'évenement"
          defaultValue={event.description}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Adresse</Label>
        <div className="flex flex-col gap-2">
          <Input
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rechercher une adresse ..."
          />
          <Button onClick={handleSearch} type="button">
            Rechercher
          </Button>
          {coords && (
            <div className="flex flex-col gap-1 mt-2">
              <p>
                Coordonnées trouvées : {coords.lat}, {coords.lon}
              </p>

              <MapView lat={coords.lat} lon={coords.lon} />
            </div>
          )}
        </div>
      </div>
      <Button type="submit" disabled={!coords}>
        Enregistrer
      </Button>
    </form>
  );
};

export default FormEvent;
