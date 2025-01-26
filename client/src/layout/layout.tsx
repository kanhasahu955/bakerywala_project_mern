import AppSidebar from "@/components/custom/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FC, ReactElement, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/layout/footer";
import Topbar from "@/layout/topbar";

interface Props {
  children?: ReactElement | ReactNode;
}

const Layout: FC<Props> = (): ReactElement => {
  return (
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      <main>
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
