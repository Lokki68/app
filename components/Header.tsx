"use client";

import { useAuth } from "@/app/AuthContext";
import Navigation from "./Navigations/Navigation";
import ModeToggle from "./themes/mode-toggle";

import type { AuthContextType } from "@/app/AuthContext";
import ProfileMenu from "./profile/ProfileMenu";

const Header = () => {
  const auth = useAuth() as AuthContextType;
  const isConnected = auth?.isAuthenticated?.isConnected ?? false;

  return (
    <header className="flex flex-col px-5 py-2 border-b border-gray-300 dark:border-gray-700 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold">EventLoop</span>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Navigation isConnected={isConnected} />
          {isConnected && <ProfileMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
