// src/components/seo/JsonLd.tsx
import { Meta } from "react-head";

interface JsonLdProps {
  type: "Organization" | "WebSite" | "WebPage" | "Article" | "BreadcrumbList";
  data: Record<string, unknown>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <Meta
      name="structured-data"
      content={JSON.stringify(structuredData)}
      data-structured-data={JSON.stringify(structuredData)}
    />
  );
}

// Organization Schema
export function OrganizationSchema() {
  return (
    <JsonLd
      type="Organization"
      data={{
        name: "Restaurant Management System",
        url: import.meta.env.VITE_SITE_URL,
        logo: `${import.meta.env.VITE_SITE_URL}/logo.png`,
        description: "Professional Restaurant Management System",
        sameAs: ["https://twitter.com/nrbnayon", "https://github.com/nrbnayon"],
      }}
    />
  );
}

// WebSite Schema
export function WebSiteSchema() {
  return (
    <JsonLd
      type="WebSite"
      data={{
        name: "Restaurant Management System",
        url: import.meta.env.VITE_SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${
            import.meta.env.VITE_SITE_URL
          }/import { unknown } from './../../../node_modules/zod/v4/classic/schemas';
search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}
