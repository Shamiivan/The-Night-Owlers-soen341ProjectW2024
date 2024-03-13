
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import React from 'react';


interface userProps {
  reservatoinId: string;
}

{/*reservationId }: userProps)*/}
export function CheckIn() {
  
  return (
    <div className=" m-10 pb-5 flex items-center border-b-2">
      <Link href="/rentalagreement">
        <Button variant="outline">Check In</Button>
      </Link>
    </div>
  );
}
