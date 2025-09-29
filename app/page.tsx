import { connectToDb } from "@/lib/utils/db/connectToDb";

export default function Home() {
  connectToDb()
  return (
    <>
      <h1>Hello Event loop</h1>
    </>
  );
}
