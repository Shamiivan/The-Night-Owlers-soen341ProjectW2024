import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/Separator";
import { Button } from "@/components/ui/button";

interface userProps {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
}

export function UserCard({ firstName, lastName, email }: userProps) {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          {firstName} {lastName}
        </p>
        <p className="text-sm text-muted-foreground">
          {email}
        </p>
      </div>
      <div className="ml-auto font-medium flex flex-row">
        <div className="mr-2">
        <Button variant="link">Update</Button>
          </div>
          <div className="mr-2">
        <Button variant ="destructive">Delete</Button>
          </div>

      </div>
      <Separator />
    </div>
  );
}
