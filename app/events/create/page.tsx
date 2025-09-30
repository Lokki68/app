"use client";

import MapView from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";

const Page = () => {
  const [coords, setCoords] = useState<{ lat: number; long: number } | null>(
    null
  );

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
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

    if (data.length > 0) {
      const { lat, lon } = data[0];
      setCoords({ lat: parseFloat(lat), long: parseFloat(lon) });
    } else {
      alert("Adresse non trouvée");
    }
  };

  console.log(coords);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log("SubmitEvent");
  };

  return (
    <main>
      <Card>
        <CardHeader>
          <h1 className="text-center text-xl">Créer un nouvel évenement</h1>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                    Coordonnées trouvées : {coords.lat}, {coords.long}
                  </p>

                  <MapView lat={coords.lat} lon={coords.long} />
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
