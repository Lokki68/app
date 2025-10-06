import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import EventType from "@/lib/types/event";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const EventLine = ({ event }: { event: EventType }) => {
  return (
    <TableRow>
      <TableCell>{formatDate(event.date)}</TableCell>
      <TableCell>{event.title}</TableCell>
      <TableCell>{event.description}</TableCell>
      <TableCell>{event.address}</TableCell>
      <TableCell>
        <Button asChild>
          <Link href={`/events/${event.slug}`}>Voir</Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EventLine;
