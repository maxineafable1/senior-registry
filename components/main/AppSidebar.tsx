'use client'

import { ChevronUp, Contact, Home, User2, UserPlus, Users, UserStar } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { logout } from "@/lib/actions/session-action"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

// Menu items.
const items = [
  {
    id: 1,
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    id: 2,
    title: "Senior Citizen Registration",
    url: "/senior-registration",
    icon: UserPlus,
  },
  {
    id: 3,
    title: "System Admin Registration",
    url: "/register",
    icon: UserStar,
  },
  {
    id: 4,
    title: "Manage Users",
    url: "/manage-users",
    icon: Users,
  },
  {
    id: 5,
    title: "My Account",
    url: "/senior-citizen",
    icon: Contact,
  },
]

export function AppSidebar({
  username,
  role,
  userId,
}: {
  username: string | undefined
  role: string | undefined
  userId: number | undefined
}) {
  const userOnly = [1, 5]
  const staffOnly = [1, 2, 3, 4]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-lg font-bold p-1.5">Senior Registry</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                // .filter(i => role !== "admin" ? i.id !== 3 : i)
                // .filter(i => role === "user" ? userOnly.includes(i.id) : role !== "admin" ? staffOnly.includes(i.id) : i.id !== 5)
                .filter(i => role === "user" ? userOnly.includes(i.id) : i.id !== 5)
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.id === 5 ? `${item.url}/${userId}` : item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[20rem]"
              >
                <DropdownMenuItem onClick={async () => {
                  await logout()
                }}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}