'use client'
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { ILocation } from "@/models/location";

type Props = {
  title: string;
  onClose: () => void;
  onSubmit: (string) => void;
  children: React.ReactNode;
};
export default function Modal({ title, onClose, onSubmit, children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams?.get("showDialog") === "true";

  //state values
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [typeOfLocation, setTypeOfLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const [error, setError] = useState(false);
  const [result, setResult] = useState("");

  // data validation 
  function validateLocationData(data: any): data is ILocation {
    return (
       typeof data.name === "string" &&
       typeof data.address === "string" &&
       typeof data.city === "string" &&
       ["city", "airport", "train station"].includes(data.typeOfLocation) &&
       typeof data.postalCode === "string" &&
       typeof data.country === "string" &&
       (typeof data.latitude === "number" || data.latitude === null) &&
       (typeof data.longitude === "number" || data.longitude === null) &&
       typeof data.phone === "string" &&
       typeof data.email === "string"
    );
   }
  // use effect to display error messages when the user enters invalid data
  useEffect(() => {
    let timer;
    if (notification.show) {
       timer = setTimeout(() => {
         setNotification({ show: false, message: '', type: '' });
       }, 2000);
    }
    return () => clearTimeout(timer);
   }, [notification]);
   
  useEffect(() => {
    if (showDialog) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    router.push("/admin/locations");
    onClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLocationData = {
      name,
      address,
      city,
      country,
      typeOfLocation,
      postalCode,
      latitude,
      longitude,
      phone,
      email
    };
    console.log(newLocationData);
    if (!validateLocationData(newLocationData)) {
      setNotification({ show: true, message: 'Invalid location data', type: 'error' });
      return;
   }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/locations`, {
        method: 'POST',
        body: JSON.stringify(newLocationData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.ok) {
        setNotification({ show: true, message: 'Location created successfully', type: 'success' });
        closeDialog();
      } else {
        setNotification({ show: true, message: 'Failed to create location', type: 'error' });
      }
    }
    catch (error) {
      console.error('Error creating location:', error);
    }
  }
  const dialog: JSX.Element | null = showDialog
    ? (
      <dialog ref={dialogRef}>

        {/* <h2>{title}</h2>
        {children} */}
        <div className="justify-center fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-0 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white pt-0 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">

                  <div className="w-full mt-2 text-left sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex flex-row p-2 justify-between bg-gray-50  sm:mt-0 sm:ml-4">
                    <h3 className="text-lg text-center leading-6 p-4 bg- font-medium text-gray-900 " id="modal-title">
                      {/* {title} */}
                      Create New Location
                    </h3>
                      <XIcon onClick={closeDialog} className="h-auto w-6 text-gray-500  hover:text-gray-700 cursor-pointer" />
               
                    </div>
                   
                    <div className="mt-2">
                      <form onSubmit={handleSubmit}>

                        {/* NOTIFICATIONS */}
                        {notification.show && (
                          <div
                            className={`mb-4 rounded-md p-2 justify-center ${notification.type === 'error' ? "bg-red-500" : "bg-green-500"}`}
                          >
                            <p className="italic m-2 text-primary-foreground">{notification.message}</p>
                          </div>
                        )}

                        <div className="space-y-4 justify-center">
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                          </div>
                          {/* Address */}
                          <div>
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                          </div>
                          {/* Country */}
                      
                          <div className="flex space-x-2">
                            <div>
                              <Label htmlFor="city">City</Label>
                              <Input id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                            </div>
                            <div>
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                          </div>
                            <div>
                              <Label htmlFor="postalCode">Postal Code</Label>
                              <Input id="postalCode" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                            </div>
                          </div>


                          <div>
                            <Label htmlFor="typeOfLocation">
                              Type of Location
                            </Label>
                            <select id="typeOfLocation" value={typeOfLocation} onChange={(e) => setTypeOfLocation(e.target.value)}>
                              <option value="">Select a location</option>
                              <option value="city">City</option>
                              <option value="train station">Train Station</option>
                              <option value="airport">Airport</option>
                            </select>
                          </div>


                          <div className="flex space-x-2">
                            <div>
                              <Label htmlFor="latitude">Latitude</Label>
                              <Input id="latitude" type="number" name="latitude" value={latitude} onChange={(e) => setLatitude(Number(e.target.value))} required />
                            </div>
                            <div>
                              <Label htmlFor="longitude">Longitude</Label>
                              <Input id="longitude" type="number" name="longitude" value={longitude} onChange={(e) => setLongitude(Number(e.target.value))} required />
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <div>
                              <Label htmlFor="phone">Phone</Label>
                              <Input id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="operatingHours">Operating Hours</Label>
                            <Input id="operatingHours" name="operatingHours" value={operatingHours} onChange={(e) => setOperatingHours(e.target.value)} />
                          </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <Button className="w-full" type="submit">
                            Create Location
                          </Button>
                        </div>
                      </form>
                      Ï
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </dialog>
    ) : null


  return dialog
}
