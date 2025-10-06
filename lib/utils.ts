import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function formatDate(date: Date) {
  const formattedDate = format(date, "dd MMM yyyy", { locale: fr });

  return formattedDate;
}
