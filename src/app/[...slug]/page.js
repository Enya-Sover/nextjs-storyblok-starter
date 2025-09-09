import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { CMS } from "@/utils/cms";
import ProductList from "@/components/sb/ProductList";
import Latest_products from "@/components/sb/Latest_products";

export default async function Page({ params }) {
  params = await params;
  const slug = params.slug ? params.slug.join("/") : "home";
  const story = await CMS.getStory(slug);

  if (!story) return notFound();
  const products = await CMS.getProducts();
  
  const productListBlock = story.content.body.find(b => b.component === "productList");

  if (slug === "products") {
    return (
      <div className="page p-4">
        <ProductList blok={story.content.body[0]} products={products} />
      </div>
    );
  }

  return (
    <div className="page p-4">
      <StoryblokStory story={story} />
      <Latest_products blok={story.content.body[0]} products={products} />

    </div>
  );
}
