import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { sessionInfo } from "@/lib/db/serverMethods/sessionServerMethods";
import {
  getContacts,
  getUsers,
} from "@/lib/db/serverMethods/userServerMethods";
import { redirect } from "next/navigation";
import ContactTable from "./(table)/contactTable";
import UsersTable from "./(table)/usersTable";

const page = async () => {
  const { userId } = await sessionInfo();

  if (!userId) {
    redirect("/signin");
  }

  const { contacts } = await getContacts(userId.toString());

  const { users } = await getUsers();

  return (
    <main>
      <div className="flex justify-between items-center mb-7">
        <h1>Utilisateurs</h1>
      </div>
      <Card className="my-4">
        <CardHeader>Mes Contacts</CardHeader>
        <CardContent>
          {contacts && <ContactTable contacts={contacts} />}
        </CardContent>
      </Card>

      <Card className="my-4">
        <CardHeader>Tous les Utilisateurs</CardHeader>
        <CardContent>{users && <UsersTable users={users} />}</CardContent>
      </Card>
    </main>
  );
};

export default page;
