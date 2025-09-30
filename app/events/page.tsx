import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex justify-between items-center">
      <h1>Events Page</h1>
      <Button asChild>
        <Link href="/events/create">Add</Link>
      </Button>
    </div>
  );
};

export default page;
