import { TableCell, TableRow } from "@/components/ui/table";
import ContactAction from "@/components/users/ContactAction";
import UserType from "@/lib/types/user";

const UserLine = ({ user }: { user: UserType }) => {

  return (
    <TableRow>
      <TableCell>
        <ContactAction contactId={user._id ? user._id.toString() : ''} action="add" />
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
    </TableRow>
  );
};

export default UserLine;
