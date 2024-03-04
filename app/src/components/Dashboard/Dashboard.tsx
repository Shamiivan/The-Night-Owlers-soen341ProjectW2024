"user client"
import React from "react";
import ReservationCard from "./ReservationCard";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserIndex from "./UserIndex";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"


const DashboardComponent = () => {
  return (
    <div className="hidden w-full flex-col md:flex">
      <Tabs defaultValue="account" className="flex  w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>

            <TabsList className="flex h-full flex-col">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            </TabsList>

          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <TabsContent value="account">
              <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="font-semibold leading-none tracking-tight">
                    Reservations
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You have 10 reservations
                  </p>
                </div>
              </div>
              {/* ReservationCard components */}
              <div className="p-4">
                <ReservationCard
                  imageUrl="/cars/01.png"
                  name="Toyota"
                  pickUpDate="Jan 20, 2023"
                  returnDate="Feb 09, 2023"
                  price="$200"
                />
                <Separator />
                <ReservationCard
                  imageUrl="/cars/01.png"
                  name="Toyota"
                  pickUpDate="Jan 20, 2023"
                  returnDate="Feb 09, 2023"
                  price="$200"
                />
              </div>

            </TabsContent>
            <TabsContent value="vehicles">
              <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="font-semibold leading-none tracking-tight">
                    Vehicles
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You have 10 vehicles
                  </p>
                </div>
              </div>
              <UserIndex />
            </TabsContent>
          </ResizablePanel>
        </ResizablePanelGroup>


      </Tabs>

    </div>



  );
};

export default DashboardComponent;
