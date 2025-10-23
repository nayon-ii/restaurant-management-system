// src/components/seo/JsonLd.tsx
import { Helmet } from "react-helmet-async";

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
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
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
