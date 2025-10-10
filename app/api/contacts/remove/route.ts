import { removeContact } from "@/lib/db/serverActions/userServerActions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { contactId } = await req.json();

  const result = await removeContact(contactId);
  return NextResponse.json(result);
}
