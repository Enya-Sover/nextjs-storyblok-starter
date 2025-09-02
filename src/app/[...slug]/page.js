//Example of a dynamic page ex
// about-us, blog/post-title, contact-us, etc.

import { getStoryblokApi } from "@/lib/storyblok";
import { notFound } from "next/navigation";
import { StoryblokStory } from '@storyblok/react/rsc';


export default async function Page({ params }) {
  try {
    //Array of slug parts ex ['blog', 'post-title']
    const { slug } = await params;
    const data = await fetchData(slug);

    //TODO: Replace with StoryblokStory component and add a fallback component
    if(data?.data?.story?.content?.component === "config"){
      throw new Error("CONFIG_ERROR");
    }
    const storyblokApi = getStoryblokApi();
  const products  = await storyblokApi.get(`cdn/stories/`, {
    version: "draft",
    content_type: "product",
  });

    return (
        <div className="page">
          <StoryblokStory story={data.data.story} />
        </div>
      );
  } catch (error) {
    console.error("Error fetching data:", error, error.message);
    return notFound();
  }
}

export async function fetchData(slug) {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/${slug.join("/")}`, {
    version: "draft",
  });
}
