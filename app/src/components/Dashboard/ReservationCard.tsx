import React from "react";

// Define the props interface
interface ReservationCardProps {
  imageUrl : string;
  name : string; 
  pickUpDate : string;
  returnDate : string;
  price : string;
}

// Create the ReservationCard component
const ReservationCard: React.FC<ReservationCardProps> = (
  { imageUrl, name, pickUpDate, returnDate, price },
) => {
  return (
    <div className="mt-8 p-6 pt-0">
      <div className="space-y-8">
        {/* Reservations */}
        <div className="flex items-center">
          <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
            <img
              className="aspect-square h-full w-full"
              alt="image"
              src={imageUrl}
            />
          </span>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {name}
            </p>

            <p className="text-sm text-muted-foreground">
              {pickUpDate} - {returnDate} 
            </p>
          </div>
          <div className="ml-auto font-medium">
            {price}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default ReservationCard;
