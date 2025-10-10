import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import UserType from "@/lib/types/user";
import { Trash2 } from "lucide-react";

const ContactLine = ({ contact }: { contact: UserType }) => {
  return (
    <TableRow>
      <TableCell>{contact.username}</TableCell>
      <TableCell>{contact.email}</TableCell>
      <TableCell>
        <Button variant="destructive" size="icon">
          <Trash2 />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ContactLine;
