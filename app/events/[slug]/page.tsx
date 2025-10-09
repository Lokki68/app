import MapView from "@/components/MapView";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getEvent } from "@/lib/db/serverMethods/eventServerMethods";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

type EventParams = {
  params: {
    slug: string;
  };
};

const Event = async ({ params }: EventParams) => {
  const { slug } = params;

  const event = await getEvent(slug);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <main>
      <Card>
        <CardHeader>
          <div className="flex justify-between w-full ">
            <p>{event.title}</p>
            <p>{formatDate(event.date)}</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <MapView
            lon={Number(event.location.coordinates[0])}
            lat={Number(event.location.coordinates[1])}
          />
          <div className="flex gap-4">
            <p>Adresse :</p>
            <span>{event.address}</span>
          </div>
          <div>
            <p>Description :</p>
            <p className="ml-4">{event.description}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 mt-12">
          <Button variant="secondary" asChild>
            <Link href={`/events/${event.slug}/update`}>Modifier</Link>
          </Button>
          <Button variant="destructive">Supprimer</Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Event;
