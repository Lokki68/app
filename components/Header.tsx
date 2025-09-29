import ModeToggle from "./themes/mode-toggle";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="flex flex-col px-5 py-2 " >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold">EventLoop</span>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
