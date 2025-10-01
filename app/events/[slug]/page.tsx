import { getEvent } from "@/lib/db/models/serverMethods/eventServerMethods";

const Event = async ({ params }) => {
  const { slug } = await params;

  const event = await getEvent(slug);

  if (!event) {
    return <div>Event not found</div>;
  }

  return <div>Event {event.title} </div>;
};

export default Event;
