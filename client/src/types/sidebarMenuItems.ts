import { ReactNode } from "react";

export interface ISidebarMenuItem {
    icon: ReactNode;
    title: string;
    to: string;
}