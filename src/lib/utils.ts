import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "receive":
      return "bg-[#2294C5] hover:bg-[#28a5dd]/90 text-white";
    case "ready":
      return "bg-[#22C55E] hover:bg-[#22c55e]/90 text-white";
    case "preparing":
      return "bg-[#B8860B] hover:bg-[#d4a12e]/90 text-white";
    case "served":
      return "bg-[#6B7280] hover:bg-[#6B7280]/90 text-white";
    default:
      return "bg-muted hover:bg-muted/90";
  }
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
