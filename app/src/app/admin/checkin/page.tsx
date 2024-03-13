"use client";
import * as React from "react";
import {
  CarIcon,
  File,
  Settings,
  UsersRound,
} from "lucide-react";

import { Nav } from "@/components/dashboard/nav";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import { Tabs } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Button } from "@/components/ui/button";
import { CheckIn } from "@/components/dashboard/CheckInForm";



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
          {/* add lable later */}
          <Nav 
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Users",
                icon: UsersRound,
                variant: "default",
                url: "/admin/users",
              },
              {
                title: "Vehicles",
                icon: CarIcon,
                variant: "ghost",
                url: "/admin/vehicles",
              },
              {
                title: "Reservations",
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
              </div>
              <Separator />
                <CheckIn />
            </Tabs>
          </ResizablePanel>
        <ResizableHandle withHandle />
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
