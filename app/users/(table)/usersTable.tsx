import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserType from "@/lib/types/user";
import UserLine from "./userLine";

const UsersTable = ({ users }: { users: UserType[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Favoris</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <UserLine key={user._id} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
