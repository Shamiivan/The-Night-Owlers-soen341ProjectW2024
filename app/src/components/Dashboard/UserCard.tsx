import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  
  export default function UserCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User</CardTitle>
          <CardDescription>Details about the user</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        <Button>View profile</Button>
        </CardFooter>
        </Card>
    )
    }
    