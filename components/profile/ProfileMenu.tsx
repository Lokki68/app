import { logout } from "@/lib/db/serverActions/sessionServerAction";
import { LogOut, UserCog } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ProfileMenu = () => {
  async function handleLogout() {
    const result = await logout();

    if (result && result.success) {
      toast.success("Déconnecter avec succès");
      redirect("/");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <UserCog className=" h-[1.2rem] w-[1.2rem] transition-all " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSeparator />
        <Button variant="secondary" onClick={handleLogout}>
          <LogOut />
          <span>Se Déconnecter</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
