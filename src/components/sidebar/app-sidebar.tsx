import * as React from "react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Image } from "@unpic/react";
import { Links } from "@/lib/types/general.types";

// This is sample data.
const user = {
  name: "Md Adnan",
  email: "adnan.arbree.solutions@gmail.com",
  avatar: "/demo.jpg",
  role: "hr",
};

type AppSidebarProps = {
  links: Links;
  props?: React.ComponentProps<typeof Sidebar>;
};

export const AppSidebar: React.FC<AppSidebarProps> = ({ links, ...props }) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-4">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square items-center justify-center rounded-lg size-8">
            <Image
              src="/arbree_logo_half_black.png"
              alt="Arbree Solutions Logo"
              width={200}
              height={100}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Arbree Solutions</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {links.map((link) => (
          <NavMain key={link.label} links={link} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
