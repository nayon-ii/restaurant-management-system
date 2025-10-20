export const APP_CONFIG = {
  name: "Restaurant Management",
  description:
    "Professional restaurant management system. Streamline table management, order processing, and inventory tracking.",
  version: "1.0.0",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
} as const;
