import { Calendar, Home, Inbox, Search, Settings , User } from "lucide-react";
import { ChevronUp } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
// Menu items.
const items = [
  {
    title: "Home",
    url: "/admindashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "/admindashboard/products",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Payments",
    url: "/admindashboard/payments",
    icon: Search,
  },
  {
    title: "Users",
    url: "/admindashboard/users",
    icon: User,
  },
  {
    title: "Settings",
    url: "/admindashboard/settings",
    icon: Settings,
  },
]

export function  AppSidebar({user,status,signOut}) {
 
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pearl</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
              

                </SidebarMenuItem>
              ))}
                  <DropdownMenu className='' >
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    {user?.name}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>{status}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span onClick={() => signOut()}  >Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
