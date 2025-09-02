// app/products/[slug]/page.js
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { slug } = params;

  const { data } = await fetchProduct(slug);

  if (!data?.story) return notFound();

  return (
    <div className="page p-4">
      <StoryblokStory story={data.story} />
    </div>
  );
}

async function fetchProduct(slug) {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/products/${slug}`, {
    version: "draft",
  });
}
