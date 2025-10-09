import { sessionInfo } from "@/lib/db/serverMethods/sessionServerMethods";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await sessionInfo();

  if (!session.success) {
    redirect("/signin");
  }

  return <>{children}</>;
};

export default Layout;
