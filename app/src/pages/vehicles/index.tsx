import { useRouter } from 'next/router';
import Card from "@/components/card";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import "@/styles/global.css";
import Link from 'next/link';

export default function Vehicles() {
  const router = useRouter();
  const isModify = router.query && router.query.modify === 'true';
  const heading = isModify ? 'Modify Reservation' : 'Available Vehicles';

  const cardData = {
    img: "https://picsum.photos/200/300?grayscale",
    name: "Car Name",
    price: 99,
    description:
      "This is a great car with excellent features for your next trip.",
    automatic: true,
    nPeople: 4,
    nBags: 2
  };
  return (
    <main>
      <Navbar/>
      <div className="flex">
        {/* filters */}
        {/*<div
          style={{ flexGrow: 1 }}
          className="rounded border p-4 m-1 flex flex-col"
        >

          <div className="flex flex-col">
            <h3>Categories</h3>
            <ul className="list-disc">
              <li>cars</li>
              <li>Suvs</li>
              <li>Trucks</li>
              <li>Vans</li>
            </ul>
          </div>
        </div>*/}

        {/* CARS */}
        <div style={{ flexGrow: 2 }} className="p-4 m-1">
          <p className="text-3xl font-semibold mb-4">{heading}</p>
          <div className="flex flex-col">
            <div className="flex mb-8 justify-between">
              <Card
                img={cardData.img}
                name={cardData.name}
                price={cardData.price}
                description={cardData.description}
                automatic={cardData.automatic}
                nPeople={cardData.nPeople}
                nBags={cardData.nBags}
              />

              <Card
                img={cardData.img}
                name={cardData.name}
                price={cardData.price}
                description={cardData.description}
                automatic={cardData.automatic}
                nPeople={cardData.nPeople}
                nBags={cardData.nBags}
              />

              <Card
                img={cardData.img}
                name={cardData.name}
                price={cardData.price}
                description={cardData.description}
                automatic={cardData.automatic}
                nPeople={cardData.nPeople}
                nBags={cardData.nBags}
              />
            </div>

            <div className="flex justify-between">
              <Card
                img={cardData.img}
                name={cardData.name}
                price={cardData.price}
                description={cardData.description}
                automatic={cardData.automatic}
                nPeople={cardData.nPeople}
                nBags={cardData.nBags}
              />

              <Card
                img={cardData.img}
                name={cardData.name}
                price={cardData.price}
                description={cardData.description}
                automatic={cardData.automatic}
                nPeople={cardData.nPeople}
                nBags={cardData.nBags}
              />

              <Card
                img={cardData.img}
                name={cardData.name}
                price={cardData.price}
                description={cardData.description}
                automatic={cardData.automatic}
                nPeople={cardData.nPeople}
                nBags={cardData.nBags}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
