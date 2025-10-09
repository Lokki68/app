"use client";

import { Button } from "@/components/ui/button";
import { deleteEvent } from "@/lib/db/serverActions/eventServerActions";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const DeleteEvent = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    const result = await deleteEvent(id);

    console.log(result);

    if (result.success) {
      toast.success("Evenement supprimé avec succès");

      redirect("/events");
    } else {
      toast.error("Un problème est survenue lors de la suppression");
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Supprimer
    </Button>
  );
};

export default DeleteEvent;
