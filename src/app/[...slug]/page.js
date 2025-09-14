import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { CMS } from "@/utils/cms";
import ProductList from "@/components/sb/ProductList";

export default async function Page({ params, searchParams }) {
  const slug = await params.slug ? params.slug.join("/") : "home";
  const story = await CMS.getStory(slug);



  if (!story) return notFound();

  const products = await CMS.getProducts();
  console.log("products in page:", products);

  return (
    <div className="page p-4">
      <StoryblokStory story={story} />
      {slug === "products" && <ProductList blok={story.content.body[0]} products={products} />}
    </div>
  );
}
