'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircleQuestion, Send } from 'lucide-react';
type Message = {
  id: string,
  user: 'bot' | 'user',
  text: string,
}
let counter = 0;
export function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [currResponse, setCurrResponse] = useState("");

  const getRandomId = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
  };

  function toggleState() {
    setIsOpen(!isOpen);
  }
  const getResponse = async function (query: string) {
    const id = getRandomId().toString();
    let message: Message = { id: id, user: 'bot', text: "" }
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
      message.text = stringfiedData;
      setMessages([...messages, message]);

    } catch (error) {
      console.error(error.message);
    } finally {
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    const newQuery: Message = { id: getRandomId().toString(), user: 'user', text: query };
    setMessages(prevMessages => [...prevMessages, newQuery]);
    console.log(messages);

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
      const id = getRandomId().toString();
      let message: Message = { id: id, user: 'bot', text: stringfiedData }
      setMessages(prevMessages => [...prevMessages, message]);
    } catch (error) {
      console.error(error.message);
      return;
    } finally {
      setQuery('');
    }
  };


  return (
    <div className="fixed z-50 flex items-end justify-end p-4 inset-0">
      <Button onClick={toggleState} className="rounded-full p-0 w-12 h-12 border-2 border-gray-200 absolute bottom-4 right-4 translate-y-0 translate-x-0">
        <MessageCircleQuestion />
        <span className="sr-only">Toggle</span>
      </Button>

      {
        isOpen && (
          <Card className="max-w-sm w-full mx-4">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Chat with Sales (Omni Rental )</CardTitle>
              <CardDescription className="text-xs leading-none">Available: 24/7</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="p-4 space-y-4 overflow-auto h-64">
                {messages && messages.map((message) => (
                  <div className="space-y-4" key={message.id}>
                    {message.user === 'user' ? (
                      // Bot message JSX
                      <div className="flex items-end gap-2">
                        <div className="rounded-lg bg-gray-100 p-3 text-sm flex-1">
                          {message.text}
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
                    ) : (
                      // User message JSX
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
                          {message.text}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              </div>

            </CardContent>
            <CardFooter className="p-4 justify-between">
              <form onSubmit={handleSubmit} className="flex justify-around space-x-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 w-54 rounded-full border-1 shadow"
                  placeholder="Type a query" />
                <Button className="flex-1 rounded-full w-10 h-10 p-0" type="submit">
                  <Send />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>

        )
      }
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
