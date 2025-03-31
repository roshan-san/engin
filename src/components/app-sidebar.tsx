"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DollarSignIcon, Laptop, MessageCircle, Search, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { NavUser } from "./nav-user"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Laptop },
  { title: "Explore Startups", url: "/explore", icon: Search },
  { title: "Connections", url: "/connections", icon: Users },
  { title: "Messaging", url: "/message", icon: MessageCircle },
  { title: "Funding", url: "/funding", icon: DollarSignIcon },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpen } = useSidebar()

  return (
    <Sidebar variant="floating" collapsible="icon"
>
      <SidebarContent
>
        <SidebarGroup onMouseEnter={() => setOpen(true)}
    onMouseLeave={() => setOpen(false)}>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" : "hover:bg-sidebar-accent/50"
                        }`}
                      >
                        <item.icon className="size-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
