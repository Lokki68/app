import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavigationItem from "./NavigationItem";

const Navbar = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-[1.2rem] w-[1.2rem] transition-all " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <NavigationItem href="/" title="Home" />
        <NavigationItem href="/events" title="Event" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
