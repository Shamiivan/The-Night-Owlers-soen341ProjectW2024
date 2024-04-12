'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function ChatbotComponent() {
  // const [messages, setMessages] = useState({
  //   queries : [""],
  //   responses : [""]
  // })
  const [messages, setMessages] = useState([
    {
      id: 1,
      query: "",
      response: "",
    }
  ]);
  const [query, setquery] = useState('');
  const [currResponse, setCurrResponse] = useState("");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/chatbot`, {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to send request");
      }


      const data = await response.json();
      const stringfiedData = JSON.stringify(data.value);
      const id = Math.random();
      setMessages([...messages, { id: id, query: query, response: stringfiedData }]);

    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="fixed z-50 flex items-end justify-end p-4 inset-0">
      <Button className="rounded-full p-0 w-12 h-12 border-2 border-gray-200 absolute bottom-4 right-4 translate-y-0 translate-x-0">
        <ChevronUpIcon className="w-6 h-6" />
        <span className="sr-only">Toggle</span>
      </Button>
      <Card className="max-w-sm w-full mx-4">
        <CardHeader className="p-4">
          <CardTitle className="text-sm">Chat with Sales (Omni Rental )</CardTitle>
          <CardDescription className="text-xs leading-none">Available: 24/7</CardDescription>
        </CardHeader>
        <CardContent className="p-4">

          {
            messages && messages.map((message) => {
              return (
                <div className="space-y-4" key={message.id}>

                  {/* USER INPUT */}

                  <div className="flex items-end gap-2">
                    <div className="rounded-lg bg-gray-100 p-3 text-sm flex-1">
                      {message.query}
                    </div>
                    <img
                      alt="Avatar"
                      className="rounded-full"
                      height="40"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                  </div>
                  {/* CHAT ANSWER */}
                  <div className="flex items-start gap-2">
                    <img
                      alt="Avatar"
                      className="rounded-full"
                      height="40"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                    <div className="rounded-lg bg-gray-100 p-3 text-sm flex-1">
                      {message.response}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </CardContent>
        <CardFooter className="p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={query}
              onChange={(e) => setquery(e.target.value)}
              className="flex-1 rounded-full border-0 shadow-none"
              placeholder="Type a query..." />
            <Button className="rounded-full w-10 h-10 p-0" type="submit">
              <SendIcon className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div >
  )
}

function ChevronUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}


function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}
