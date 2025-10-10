import { Menu } from "lucide-react";
import NavigationItem from "../NavigationItem";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="hidden md:inline ">Menu</span>
          <Menu className="md:hidden h-[1.2rem] w-[1.2rem] transition-all " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <NavigationItem href="/" title="Accueil" />
        {isConnected && (
          <>
            <NavigationItem href="/events" title="Evènements" />
            <NavigationItem href="/users" title="Utilisateurs" />
          </>
        )}
        {!isConnected && (
          <>
            <DropdownMenuSeparator />
            <NavigationItem href="/signin" title="Se connecter" />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
