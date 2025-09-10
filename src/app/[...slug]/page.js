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
  const products = await CMS.getProducts();


  if (slug === "products") {
    return (
      <div className="page p-4">
        <ProductList blok={story.content.body[0]} products={products} />
      </div>
    );
  }
  if (slug === "about" || slug === "home") return (
    <div className="page p-4">
      <StoryblokStory story={story} />
      <Three_latest_products blok={story.content.body} products={products} />
    </div>
  )
  else {
    return (
      <div className="page p-4">
        <StoryblokStory story={story} />

      </div>
    )
  }
}
