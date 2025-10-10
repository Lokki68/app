import { TableCell, TableRow } from "@/components/ui/table";
import ContactAction from "@/components/users/ContactAction";
import UserType from "@/lib/types/user";

const ContactLine = ({ contact }: { contact: UserType }) => {
  return (
    <TableRow>
      <TableCell>{contact.username}</TableCell>
      <TableCell>{contact.email}</TableCell>
      <TableCell>
        <ContactAction contactId={contact._id ? contact._id : ''} action="remove" />
      </TableCell>
    </TableRow>
  );
};

export default ContactLine;
