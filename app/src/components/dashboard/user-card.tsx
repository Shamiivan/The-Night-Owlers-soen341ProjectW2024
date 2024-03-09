import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';



interface userProps {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
}

export function UserCard({ firstName, lastName, email, _id }: userProps) {
  const router = useRouter();
  const deleteUser = async () => {
    try {
      const response = await fetch(`/api/users/${_id}`, {
        method: 'DELETE',
        body: JSON.stringify({ _id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) { throw new Error('Failed to delete user'); }
      else if (response.ok) { router.push("/admin/users"); }


    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };
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
          <Link href={`/admin/updateUser/${_id}`}>
            <Button variant="link">Update</Button>
          </Link>


        </div>
        <div className="mr-2">
          <Button variant="destructive" onClick={deleteUser}>Delete</Button>
        </div>

      </div>
      <Separator />
    </div>
  );
}
