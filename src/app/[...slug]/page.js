import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { CMS } from "@/utils/cms";

export default async function Page({ params }) {
  params = await params
  const slug = params.slug ? params.slug.join("/") : "home";
  const story = await CMS.getStory(slug);

  if (!story) return notFound();

  return (
    <div className="page p-4">
      <StoryblokStory story={story} />
    </div>
  );
}
