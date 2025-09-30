import Link from "next/link";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface NavigationItemProps {
  href: string;
  title: string;
}

const NavigationItem = ({ href, title }: NavigationItemProps) => {
  return (
    <DropdownMenuItem>
      <Link href={href}>{title}</Link>
    </DropdownMenuItem>
  );
};

export default NavigationItem;
