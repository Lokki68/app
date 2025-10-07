import MapView from "@/components/MapView";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getEvent } from "@/lib/db/serverMethods/eventServerMethods";

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
        <CardHeader>{event.title}</CardHeader>
        <CardContent>
          <MapView
            lon={Number(event.location.coordinates[0])}
            lat={Number(event.location.coordinates[1])}
          />
        </CardContent>
      </Card>
    </main>
  );
};

export default Event;
