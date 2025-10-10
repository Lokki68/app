import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EventType from "@/lib/types/event";
import EventLine from "./eventLine";

const EventsTable = ({ events }: { events: EventType[] }) => {
  return (
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
  );
};

export default EventsTable;
