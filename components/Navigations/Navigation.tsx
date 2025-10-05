"use client";

import { useAuth } from "@/app/AuthContext";
import { logout } from "@/lib/db/serverActions/sessionServerAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavigationItem from "./NavigationItem";

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { isConnected } = isAuthenticated;

  async function handleLogout() {
    console.log("Logout");
    const result = await logout();

    if (result && result.success) {
      toast.success("Déconnecter avec succès");
      router.push("/");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Menu
          {/* <Menu className="h-[1.2rem] w-[1.2rem] transition-all " /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <NavigationItem href="/" title="Home" />
        <NavigationItem href="/events" title="Event" />
        <DropdownMenuSeparator />
        {isConnected ? (
          <Button onClick={handleLogout} variant="ghost">
            Se déconnecter
          </Button>
        ) : (
          <NavigationItem href="/signin" title="Se connecter" />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
