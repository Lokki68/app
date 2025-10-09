import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getEvents } from "@/lib/db/serverMethods/eventServerMethods";
import { sessionInfo } from "@/lib/db/serverMethods/sessionServerMethods";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import EventsTable from "./eventsTable";

const Events = async () => {
  const { userId } = await sessionInfo();

  if (!userId) {
    redirect("/signin");
  }

  const { events } = await getEvents(userId);

  return (
    <main>
      <div className="flex justify-between items-center mb-7">
        <h1>Evenements</h1>
        <Button asChild>
          <Link href="/events/create">
            <CirclePlus />
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>Mes évenements</CardHeader>
        <CardContent>{events && <EventsTable events={events} />}</CardContent>
      </Card>
    </main>
  );
};

export default Events;
