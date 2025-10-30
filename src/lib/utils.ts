import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "receive":
      return "bg-[#2294C5] hover:bg-[#28a5dd]/90 text-white flex items-center justify-center rounded-full";
    case "ready":
      return "bg-[#22C55E] hover:bg-[#22c55e]/90 text-white flex items-center justify-center rounded-full";
    case "preparing":
      return "bg-[#B8860B] hover:bg-[#d4a12e]/90 text-white flex items-center justify-center rounded-full";
    case "served":
      return "bg-[#00A789] hover:bg-[#00A789]/90 text-white flex items-center justify-center rounded-full";
    case "pending":
      return "bg-[#A0B238] hover:bg-[#A0B238]/90 text-white flex items-center justify-center rounded-full";
    default:
      return "bg-muted hover:bg-muted/90";
  }
};


export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

// Get today's date in YYYY-MM-DD format for min attribute
export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Convert date from input format to display format
export const convertToDisplayDate = (dateStr: string) => {
  if (!dateStr) return "";

  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    }
  } catch {
    return dateStr;
  }
  return dateStr;
};
