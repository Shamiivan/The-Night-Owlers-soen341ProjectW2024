"use client";
import * as React from "react";
import {
  CarIcon,
  File,
  Search,
  Send,
  Settings,
  UsersRound,
} from "lucide-react";

import { Nav } from "@/components/dashboard/nav";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import UserList from "@/components/dashboard/users";
import { Button } from "@/components/ui/button";
import CreateUserForm from "@/pages/signUp";


export default function Users({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )
            }`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={(collapsed) => {
            setIsCollapsed(collapsed);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed,
            )
              }`;
          }}
          className={cn(
            isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
        >
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Users",
                label: "128",
                icon: UsersRound,
                variant: "default",
                url: "/admin/users",
              },
              {
                title: "Vehicles",
                label: "9",
                icon: CarIcon,
                variant: "ghost",
                url: "/admin/vehicles",
              },
              {
                title: "Reservations",
                label: "100",
                icon: File,
                variant: "ghost",
                url : "/admin/reservations",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Settings",
                icon: Settings,
                variant: "ghost",
                url : "/admin/settings",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Dashboard</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Main view
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-200"
                >
                 <Button asChild variant="secondary" className="">
                  Create User
                 </Button>
                </TabsTrigger>
          
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <UserList />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <CreateUserForm />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
