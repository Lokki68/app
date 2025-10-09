import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { sessionInfo } from "@/lib/db/serverMethods/sessionServerMethods";
import { getUsers } from "@/lib/db/serverMethods/userServerMethods";
import { redirect } from "next/navigation";
import UsersTable from "./usersTable";

const page = async () => {
  const { userId } = await sessionInfo();

  if (!userId) {
    redirect("/signin");
  }

  const { users } = await getUsers();

  return (
    <main>
      <div className="flex justify-between items-center mb-7">
        <h1>Utilisateurs</h1>
      </div>
      <Card className="my-4">
        <CardHeader>Mes Contacts</CardHeader>
        <CardContent></CardContent>
      </Card>

      <Card className="my-4">
        <CardHeader>Tous les Utilisateurs</CardHeader>
        <CardContent>{users && <UsersTable users={users} />}</CardContent>
      </Card>
    </main>
  );
};

export default page;
