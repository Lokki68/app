import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import UserType from "@/lib/types/user";
import { Star } from "lucide-react";

const UserLine = ({ user }: { user: UserType }) => {
  return (
    <TableRow>
      <TableCell>
        <Button variant="ghost" size="icon">
          <Star />
        </Button>
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
    </TableRow>
  );
};

export default UserLine;
