import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface NavigationItemProps {
  href: string;
  title: string;
}

const NavigationItem = ({ href, title }: NavigationItemProps) => {
  const router = useRouter();

  function handleNavigate() {
    router.push(href);
  }
  return <DropdownMenuItem onClick={handleNavigate}>{title}</DropdownMenuItem>;
};

export default NavigationItem;
