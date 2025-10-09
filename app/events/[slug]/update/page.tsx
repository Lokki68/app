import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getEvent } from "@/lib/db/serverMethods/eventServerMethods";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";
import FormEvent from "./formEvent";

type UpdateEventParams = {
  params: {
    slug: string;
  };
};

const page = async ({ params }: UpdateEventParams) => {
  const { slug } = params;

  const event = await getEvent(slug);
  return (
    <main>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <h2 className="text-2xl">Modifier l'évènement</h2>
            <Button size="icon" asChild>
              <Link href={`/events/${slug}`}>
                <CircleArrowLeft />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {event && <FormEvent event={JSON.parse(JSON.stringify(event))} />}
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
