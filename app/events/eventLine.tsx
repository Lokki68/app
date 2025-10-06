import { TableCell, TableRow } from "@/components/ui/table";
import EventType from "@/lib/types/event";

const EventLine = ({ event }: { event: EventType }) => {
  return (
    <TableRow>
      <TableCell>{event.title}</TableCell>
    </TableRow>
  );
};

export default EventLine;
