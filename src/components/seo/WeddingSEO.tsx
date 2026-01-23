import { Helmet } from "react-helmet-async";

interface WeddingSEOProps {
  brideName: string;
  groomName: string;
  weddingDate?: string;
  eventLocation?: string;
  description?: string;
  imageUrl?: string;
  canonicalUrl?: string;
  pageType?: "wedding" | "template" | "demo";
}

/**
 * SEO Component for Wedding pages with comprehensive meta tags,
 * Open Graph, Twitter Cards, and JSON-LD structured data
 */
const WeddingSEO = ({
  brideName,
  groomName,
  weddingDate,
  eventLocation,
  description,
  imageUrl,
  canonicalUrl,
  pageType = "wedding",
}: WeddingSEOProps) => {
  // Format names for title
  const coupleName = `${groomName} & ${brideName}`;
  
  // Generate title based on page type
  const pageTitle = pageType === "template" 
    ? `Mẫu Thiệp Cưới - ${coupleName} | True Loves`
    : `${coupleName} - Thiệp Mời Cưới | True Loves`;
  
  // Format wedding date for display
  const formattedDate = weddingDate 
    ? new Date(weddingDate).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : undefined;
  
  // Generate description
  const metaDescription = description || 
    `Trân trọng kính mời bạn đến dự lễ cưới của ${coupleName}${formattedDate ? ` vào ${formattedDate}` : ""}${eventLocation ? ` tại ${eventLocation}` : ""}. Hãy cùng chúng tôi chia sẻ niềm vui trong ngày trọng đại này.`;
  
  // Default OG image
  const ogImage = imageUrl || "/images/wedding06.webp";
  const absoluteImageUrl = ogImage.startsWith("http") 
    ? ogImage 
    : `${typeof window !== 'undefined' ? window.location.origin : ''}${ogImage}`;
  
  // Generate JSON-LD Event structured data
  const eventJsonLd = weddingDate ? {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `Lễ Cưới ${coupleName}`,
    "description": metaDescription,
    "startDate": weddingDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    ...(eventLocation && {
      "location": {
        "@type": "Place",
        "name": eventLocation,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": eventLocation,
          "addressCountry": "VN"
        }
      }
    }),
    "organizer": {
      "@type": "Person",
      "name": coupleName
    },
    "image": absoluteImageUrl,
    "performer": [
      {
        "@type": "Person",
        "name": groomName
      },
      {
        "@type": "Person",
        "name": brideName
      }
    ]
  } : null;

  // Generate WebPage structured data
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": metaDescription,
    "url": canonicalUrl || (typeof window !== 'undefined' ? window.location.href : ''),
    "inLanguage": "vi-VN",
    "isPartOf": {
      "@type": "WebSite",
      "name": "True Loves",
      "url": typeof window !== 'undefined' ? window.location.origin : ''
    },
    ...(weddingDate && {
      "about": {
        "@type": "Event",
        "name": `Lễ Cưới ${coupleName}`,
        "startDate": weddingDate
      }
    })
  };

  // Generate BreadcrumbList structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang Chủ",
        "item": typeof window !== 'undefined' ? window.location.origin : ''
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageType === "template" ? "Mẫu Thiệp" : "Thiệp Cưới",
        "item": typeof window !== 'undefined' 
          ? `${window.location.origin}/${pageType === "template" ? "templates" : "weddings"}`
          : ''
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": coupleName,
        "item": canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '')
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={`thiệp cưới, wedding invitation, ${groomName}, ${brideName}, thiệp mời đám cưới, wedding card, True Loves`} />
      <meta name="author" content="True Loves" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Vietnamese" />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="True Loves" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`Thiệp cưới ${coupleName}`} />
      <meta property="og:locale" content="vi_VN" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@TrueLoves" />
      <meta name="twitter:creator" content="@TrueLoves" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:image:alt" content={`Thiệp cưới ${coupleName}`} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#c4a99b" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={coupleName} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(webPageJsonLd)}
      </script>
      
      {eventJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(eventJsonLd)}
        </script>
      )}
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
    </Helmet>
  );
};

export default WeddingSEO;
