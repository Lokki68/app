import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const page = () => {
  return (
    <main>
      <div className="flex justify-between items-center mb-7">
        <h1>Events Page</h1>
        <Button asChild>
          <Link href="/events/create">Add</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>Mes évenements</CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
