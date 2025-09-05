// app/products/[slug]/page.js
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { CMS } from "@/utils/cms";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const story = await CMS.getProduct(slug);

  if (!story) return notFound();

  return (
    <div className="page p-4">
      <StoryblokStory story={story} />
    </div>
  );
}


