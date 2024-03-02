import React from "react";
import ReservationCard from "./ReservationCard";
import { Separator } from "./separator";

const DashboardComponent = () => {
  return (
    <div className="hidden flex-col md:flex">
      {/* Existing component structure */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <div className="grid gap-2">
              <button
                className="inline-flex items-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-[260px] justify-start text-left font-normal"
                id="date"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:r1n:"
                data-state="closed"
              >
                Jan 20, 2023 - Feb 09, 2023
              </button>
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              Download
            </button>
          </div>
        </div>
        {/* Additional content from the provided HTML snippet */}
        <div dir="ltr" data-orientation="horizontal" className="space-y-4">
          {/* Tablist and Tabpanel components */}
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
            tabIndex="0"
            data-orientation="horizontal"
          >
            {/* Tab buttons */}
          </div>
          <div
            data-state="active"
            data-orientation="horizontal"
            role="tabpanel"
            aria-labelledby="radix-:r1o:-trigger-overview"
            id="radix-:r1o:-content-overview"
            tabIndex="0"
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4"
          >
            <div
              dir="ltr"
              data-orientation="horizontal"
              className="space-y-4"
            >
              <div
                role="tablist"
                aria-orientation="horizontal"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
                data-orientation="horizontal"
              >
                {/* Tab buttons */}
              </div>
              <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="font-semibold leading-none tracking-tight">
                    Reservations
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You have 10 reservations
                  </p>
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
                  <Separator/>
                  <ReservationCard
                    imageUrl="/cars/01.png"
                    name="Toyota"
                    pickUpDate="Jan 20, 2023"
                    returnDate="Feb 09, 2023"
                    price="$200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
