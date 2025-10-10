"use client";

import { Star, StarOff } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

const ContactAction = ({
  contactId,
  action,
}: {
  contactId: string;
  action: "add" | "remove";
}) => {
  const handleAddContact = async () => {
    if (contactId === "") {
      return;
    }

    const res = await fetch("/api/contacts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId }),
    });

    if (res.ok) {
      toast.success("Contact ajouté avec succès");
      redirect("/");
    }
  };

  const handleRemoveContact = async () => {
    if (contactId === "") {
      return;
    }

    const res = await fetch("/api/contacts/remove", {
      method: "POST",
      headers: { "Content-Type": "appilication/json" },
      body: JSON.stringify({ contactId }),
    });

    if (res.ok) {
      toast.success("Contact supprimé avec succès");
      redirect("/");
    }
  };

  return (
    <>
      {action === "add" && (
        <Button onClick={handleAddContact}>
          <Star />
        </Button>
      )}

      {action === "remove" && (
        <Button onClick={handleRemoveContact}>
          <StarOff />
        </Button>
      )}
    </>
  );
};

export default ContactAction;
