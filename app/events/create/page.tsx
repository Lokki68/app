import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const page = () => {
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
            <div className="flex flex-col gap-2"></div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
