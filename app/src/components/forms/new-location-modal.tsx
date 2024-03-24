import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createLocation } from "@/utils/locationRepository";

export function NewLocationModal({ isOpen, onClose }) {
 const [name, setName] = useState("");
 const [address, setAddress] = useState("");
 const [city, setCity] = useState("");
 const [state, setState] = useState("");
 const [typeOfLocation, setTypeOfLocation] = useState("");
 const [postalCode, setPostalCode] = useState("");
 const [country, setCountry] = useState("");
 const [latitude, setLatitude] = useState("");
 const [longitude, setLongitude] = useState("");
 const [phone, setPhone] = useState("");
 const [email, setEmail] = useState("");
 const [operatingHours, setOperatingHours] = useState("");
 const [services, setServices] = useState("");
 const [description, setDescription] = useState("");
 const [error, setError] = useState(false);
 const [result, setResult] = useState("");
 const router = useRouter();

 const createLocationMutation = useMutation(createLocation, {
    onSuccess: () => {
      setResult("Location created successfully");
      setError(false);
      onClose(); // Close the modal after successful creation
      router.reload(); // Optionally, reload the page to reflect the new location
    },
    onError: (error) => {
      setResult("Failed to create location");
      setError(true);
    },
 });

 const handleSubmit = (e) => {
    e.preventDefault();
    createLocationMutation.mutate({
      name,
      address,
      city,
      state,
      typeOfLocation,
      postalCode,
      country,
      latitude,
      longitude,
      phone,
      email,
      operatingHours,
      services,
      description,
    });
 };

 if (!isOpen) return null;

 return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                 Add New Location
                </h3>
                <div className="mt-2">
                 <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                      {/* Add other input fields similarly */}
                      <Button className="w-full" type="submit">
                        Create Location
                      </Button>
                    </div>
                 </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button onClick={onClose} className="w-full sm:ml-3 sm:w-auto">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
 );
}
