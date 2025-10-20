import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export function SEO({
  title,
  description = "Professional Restaurant Management System for efficient operations",
  keywords = "restaurant management, table management, order processing, inventory tracking",
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonicalUrl,
  noindex = false,
  nofollow = false,
}: SEOProps) {
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://yoursite.com";
  const fullTitle = title
    ? `${title} | Restaurant Management System`
    : "Restaurant Management System";
  const canonical = canonicalUrl || window.location.href;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      {(noindex || nofollow) && (
        <meta
          name="robots"
          content={`${noindex ? "noindex" : "index"},${
            nofollow ? "nofollow" : "follow"
          }`}
        />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Restaurant Management System" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:creator" content="@nrbnayon" />

      {/* Additional Meta */}
      <meta name="author" content="Restaurant Management System" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Helmet>
  );
}
