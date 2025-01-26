import { ISidebarMenuItem } from "@/types/sidebarMenuItems";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";

export const sidebarItems: ISidebarMenuItem[] = [
  {
    icon: <IoHomeOutline />,
    title: "Home",
    to: "/",
  },
  {
    icon: <BiCategoryAlt />,
    title: "Categories",
    to: "/",
  },
  {
    icon: <GrBlog />,
    title: "Blogs",
    to: "/",
  },
  {
    icon: <FaRegComments />,
    title: "Comments",
    to: "/",
  },
  {
    icon: <LuUsers />,
    title: "Users",
    to: "/",
  },
];
