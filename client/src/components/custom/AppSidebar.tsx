import _ from "lodash";
import { ReactElement, FC } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { ISidebarMenuItem } from "@/types/sidebarMenuItems";
import { sidebarItems } from "@/constants/sidebarMenu";
import Logo from "@/assets/logo.jpg";

const AppSidebar: FC<any> = (): ReactElement => {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={Logo} alt="logo" height={20} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            {_.map(sidebarItems, (item: ISidebarMenuItem) => (
              <SidebarMenuItem>
                <SidebarMenuButton>
                  {item.icon}
                  <Link to={item.to}>{item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
