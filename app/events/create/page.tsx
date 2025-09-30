import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const page = () => {
  return (
    <main>
      <Card>
        <CardHeader>
          <h1>Créer un nouvel évenement</h1>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" name="title" />
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
