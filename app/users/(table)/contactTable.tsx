import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserType from "@/lib/types/user";
import ContactLine from "./contactLine";

const ContactTable = ({ contacts }: { contacts: UserType[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <ContactLine key={contact._id} contact={contact} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactTable;
