import "@/styles/global.css";
import Card from "../components/ui/Card";
import Navbar from "../components/ui/Navbar";

export default function Home() {
  const cardData = {
    name: "Car Name",
    price: "$99/day",
    description:
      "This is a great car with excellent features for your next trip.",
    automatic: true,
    nPeople: 4,
    nBags: 2,
  };
  return (
    <main>
      <h1>Welcome to My Page</h1>
      <Card
        name={cardData.name}
        price={cardData.price}
        description={cardData.description}
        automatic={cardData.automatic}
        nPeople={cardData.nPeople}
        nBags={cardData.nBags}
      />{" "}
      <Navbar />
    </main>
  );
}
