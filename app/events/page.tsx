import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <h1>Events Page</h1>
      <Button asChild>
        <Link href="/events/create">Add</Link>
      </Button>
    </div>
  );
};

export default page;
