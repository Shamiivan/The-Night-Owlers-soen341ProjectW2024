import Card from "@/components/ui/card";

export default function VehiclesIndex() {
  const cardData = {
    name: "Car Name",
    price: 99,
    description:
      "This is a great car with excellent features for your next trip.",
    automatic: true,
    nPeople: 4,
    nBags: 2,
  };
  return (
    <main>
      <div className="bg-secondary">
        <h1 className="text-primary-foreground">Welcome to My Page</h1>
      </div>
      <Card
        name={cardData.name}
        price={cardData.price}
        description={cardData.description}
        automatic={cardData.automatic}
        nPeople={cardData.nPeople}
        nBags={cardData.nBags}
      />
      {" "}
    </main>
  );
}
