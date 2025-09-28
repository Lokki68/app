import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import ModeToggle from "./themes/mode-toggle";

const Header = () => {

  const handleLogout = () => {
    console.log('logout')
  }

  return (
    <div className="flex justify-between items-center w-full ">
      <div className="flex items-center gap-4">
        {/* <SidebarTrigger /> */}
        <span className="text-2xl font-semibold">EventLoop</span>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={handleLogout}>
          <LogOut className="lg:nine" />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
