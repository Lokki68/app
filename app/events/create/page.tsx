"use client";

import MapView from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addEvent } from "@/lib/db/serverActions/eventServerActions";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const CreateEvent = () => {
  const router = useRouter();
  const [coords, setCoords] = useState<{ lat: string; lon: string } | null>(
    null
  );

  const [address, setAddress] = useState("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!address) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );

    const data = await res.json();

    console.log(data[0]);

    if (data.length > 0) {
      const { lat, lon } = data[0];
      setCoords({ lat, lon });
    } else {
      toast.error("Adresse non trouvée");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    if (coords) {
      formData.append("lat", coords.lat);
      formData.append("lon", coords.lon);
    }

    try {
      const result = await addEvent(formData);

      if (result.success) {
        toast.success("Évenement créé avec succès !");
      }

      router.push(`/events/${result.slug}`);
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la création de l'évenement."
      );
    }
  };

  return (
    <main>
      <Card>
        <CardHeader>
          <h1 className="text-center text-xl">Créer un nouvel évenement</h1>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" name="title" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Input id="date" name="date" type="date" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description de l'évenement"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Adresse</Label>
              <div className="flex gap-2">
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
              </div>
              {coords && (
                <div className="flex flex-col gap-1 mt-2">
                  <p>
                    Coordonnées trouvées : {coords.lat}, {coords.lon}
                  </p>

                  <MapView lat={coords.lat} lon={coords.lon} />
                </div>
              )}
            </div>
            <Button type="submit" disabled={!coords}>
              Enregistrer
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default CreateEvent;
