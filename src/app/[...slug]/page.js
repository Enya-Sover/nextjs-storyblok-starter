import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { CMS } from "@/utils/cms";
import ProductList from "@/components/sb/ProductList";

export default async function Page({ params }) {
  params = await params;
  const slug = params.slug ? params.slug.join("/") : "home";
  const story = await CMS.getStory(slug);

  if (!story) return notFound();

  if (slug === "products") {
    const products = await CMS.getProducts();
    return (
      <div className="page p-4">
        <ProductList blok={story.content.body[0]} products={products} />
      </div>
    );
  }

  return (
    <div className="page p-4">
      <StoryblokStory story={story} />
    </div>
  );
}
