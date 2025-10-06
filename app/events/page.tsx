import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEvents } from "@/lib/db/serverMethods/eventServerMethods";
import { sessionInfo } from "@/lib/db/serverMethods/sessionServerMethods";
import Link from "next/link";
import { redirect } from "next/navigation";
import EventLine from "./eventLine";

const Events = async () => {
  const { userId } = await sessionInfo();

  if (!userId) {
    redirect("/signin");
  }

  const { events } = await getEvents(userId);

  console.log(events);
  return (
    <main>
      <div className="flex justify-between items-center mb-7">
        <h1>Events Page</h1>
        <Button asChild>
          <Link href="/events/create">Add</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>Mes évenements</CardHeader>
        <CardContent>
          {events && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Lieu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <EventLine key={event._id} event={event} />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default Events;
