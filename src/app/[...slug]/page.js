import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { CMS } from "@/utils/cms";
import ProductList from "@/components/sb/ProductList";
import Three_latest_products from "@/components/sb/three_latest_products";

export default async function Page({ params }) {
  params = await params;
  const slug = params.slug ? params.slug.join("/") : "home";
  const story = await CMS.getStory(slug);

  if (!story) return notFound();


  if (slug === "products") {
    return (
      <div className="page p-4">
        <ProductList blok={story.content.body[0]} />
      </div>
    );
  }
  
  else {
    return (
      <div className="page p-4">
        <StoryblokStory story={story} />

      </div>
    )
  }
}
