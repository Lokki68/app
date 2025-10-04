"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/db/serverActions/sessionAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

const Signin = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const result = await login(formData);

      if (result.success) {
        toast.success("Utilisateur connecté avec succès");
      }

      router.push("/");
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la connexion, verifier vos identifiants"
      );
    }
  };

  return (
    <main>
      <Card>
        <CardHeader>
          <h1 className="text-center text-xl">Connection</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Votre username</Label>
              <Input id="username" name="username" />
            </div>

            <div className="grow flex flex-col gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" name="password" />
            </div>

            <Button type="submit">Envoyer</Button>
            <p className="text-center">
              Je ne pocède pas de compte -{" "}
              <Link href="/signup" className="text-blue-600 underline">
                inscription ici
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Signin;
