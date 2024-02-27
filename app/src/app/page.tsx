import Image from "next/image";
import "@/styles/global.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "../lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main>
      <div className="flex">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Toyota Camry</CardTitle>
            <CardDescription>52$/day</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Make a reservation</Button>
            <Button variant="destructive" size="lg">Delete</Button>
            <Button variant="secondary" size="lg">Delete</Button>
            <Button variant="outline" size="sm">Cancel</Button>

            <Button variant="ghost" size="icon">?</Button>
          </CardFooter>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Toyota Camry</CardTitle>
            <CardDescription>52$/day</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Make a reservation</Button>
          </CardFooter>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Toyota Camry</CardTitle>
            <CardDescription>52$/day</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Make a reservation</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
