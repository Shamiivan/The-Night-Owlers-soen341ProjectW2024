import Card from "@/components/card";
import "@/styles/global.css";

export default function Vehicles() {
  const cardData = {
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
      <div className="flex">
        {/* filters */}
        <div
          style={{ flexGrow: 1 }}
          className="rounded border p-4 m-1 flex flex-col"
        >
          {/* FILTERS 1: CATEGORIES */}
          <div className="flex flex-col">
            <h3>Categories</h3>
            <ul className="list-disc">
              <li>cars</li>
              <li>Suvs</li>
              <li>Trucks</li>
              <li>Vans</li>
            </ul>
          </div>
        </div>

        {/* CARS */}
        <div style={{ flexGrow: 2 }} className="p-4 m-1">
          <div className="flex flex-col">
            <div className="flex mb-8 justify-between">
              <Card
                name={cardData.name}
                price={cardData.price}
                description={cardData.description}
                automatic={cardData.automatic}
                nPeople={cardData.nPeople}
                nBags={cardData.nBags}
              />

              <Card
                name={cardData.name}
                price={cardData.price}
                description={cardData.description}
                automatic={cardData.automatic}
                nPeople={cardData.nPeople}
                nBags={cardData.nBags}
              />

              <Card
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
                name={cardData.name}
                price={cardData.price}
                description={cardData.description}
                automatic={cardData.automatic}
                nPeople={cardData.nPeople}
                nBags={cardData.nBags}
              />

              <Card
                name={cardData.name}
                price={cardData.price}
                description={cardData.description}
                automatic={cardData.automatic}
                nPeople={cardData.nPeople}
                nBags={cardData.nBags}
              />

              <Card
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
    </main>
  );
}
