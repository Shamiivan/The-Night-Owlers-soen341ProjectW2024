'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function ChatbotComponent() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/chatbot`, {
        method: 'POST',
        body: JSON.stringify({message}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log(data.value);
      if (response.ok) {
      } else {
        throw new Error("Failed to send request");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 inset-0">
      <Button className="rounded-full p-0 w-12 h-12 border-2 border-gray-200 absolute bottom-4 right-4 translate-y-0 translate-x-0">
        <ChevronUpIcon className="w-6 h-6" />
        <span className="sr-only">Toggle</span>
      </Button>
      <Card className="max-w-sm w-full mx-4">
        <CardHeader className="p-4">
          <CardTitle className="text-sm">Chat with Sales (ACME RENTALS)</CardTitle>
          <CardDescription className="text-xs leading-none">Available: Mon-Fri, 9am-5pm</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <div className="rounded-lg bg-gray-100 p-3 text-sm flex-1">
                Hi, I'm interested in renting a car for the weekend.
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
                Can you tell me what type of cars you have available?
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-lg bg-gray-100 p-3 text-sm flex-1">
                Sure! We have a variety of cars available, including sedans, SUVs, and luxury vehicles. Would you like
                more information about a specific type of car?
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
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-full border-0 shadow-none" 
            placeholder="Type a message..." />
            <Button className="rounded-full w-10 h-10 p-0" type="submit">
              <SendIcon className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
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
