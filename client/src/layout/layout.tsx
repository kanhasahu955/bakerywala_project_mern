import AppSidebar from "@/components/custom/AppSidebar";
import Footer from "@/layout/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FC, ReactElement, ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement | ReactNode;
}

const Layout: FC<Props> = (): ReactElement => {
  return (
    <SidebarProvider>
      {/* <Topbar/> */}
      <AppSidebar />
      <main>
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
