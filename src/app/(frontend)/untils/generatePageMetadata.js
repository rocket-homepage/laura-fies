export default async function generatePageMetadata(params, fallback = {}) {
  try {
    const fetchUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://laura-fies-2025.vercel.app/my-route?slug="
    }${params}`;

    const metadataResponse = await fetch(fetchUrl, {
      next: { revalidate: 60 }
    });

    console.log("metadata response status:", metadataResponse.status);

    if (!metadataResponse.ok) {
      throw new Error(`Failed to fetch data: ${metadataResponse.statusText}`);
    }

    const data = await metadataResponse.json();
    const seo = data?.data?.seo || {};

    // Use fallback if API data is missing
    const title = seo?.meta?.title || fallback.title || "Default Title";
    const description = seo?.meta?.description || fallback.description || "Default Description";

    const canonical = seo?.meta?.canonicalUrl || ``;
    
    // Ensure the robots tag is always a valid string
    const indexing = seo?.meta?.indexing || "index";
    const following = seo?.meta?.following || "follow";
    const robots = `${indexing},${following}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      robots,
      openGraph: {
        type: "article",
        title: seo?.social?.facebook?.title || title,
        description: seo?.social?.facebook?.description || description,
        url: canonical,
      },
      // Adding Twitter meta for completeness
      twitter: {
        card: "summary_large_image",
        title: seo?.social?.twitter?.title || title,
        description: seo?.social?.twitter?.description || description,
      }
    };
  } catch (error) {
    console.error("Error in generatePageMetadata:", error);
    // Return a solid fallback in case of API failure
    return {
      title: fallback.title || "Error Title",
      description: fallback.description || "Error Description: Could not load SEO data.",
    };
  }
}
