"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/db/serverActions/sessionAction";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const result = await register(formData);

      if (result.success) {
        toast.success("Utilisateur créé avec succès");
      }

      router.push("/signin");
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de l'enregistrement de l'utilisateur "
      );
    }
  };

  return (
    <main>
      <Card>
        <CardHeader>
          <h1 className="text-center text-xl">S'enregistrer</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Votre Email</Label>
              <Input id="email" name="email" />
            </div>

            <div className="flex w-full gap-4">
              <div className="grow flex flex-col gap-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" name="password" />
              </div>

              <div className="grow flex flex-col gap-2">
                <Label htmlFor="repeatPassword">Confirmer mot de passe</Label>
                <Input id="repeatPassword" name="repeatPassword" />
              </div>
            </div>

            <Button type="submit">S'enregistrer</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignUp;
