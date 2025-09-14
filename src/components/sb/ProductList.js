"use client"
import { CMS } from "@/utils/cms";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ProductList({ blok, products }) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams?.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [loadedProducts, setLoadedProducts] = useState(products || []);
  console.log("products prop from product list:", products);
  console.log("loaded products from product list:", loadedProducts);
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    if (!products || products.length === 0) {
      CMS.getProducts().then(setLoadedProducts);
    }
  }, [products]);

  const handleCategoryClick = (title) => setSelectedCategory(title);

  const filteredProducts = loadedProducts
    .filter(p => !selectedCategory || p.content.category?.toLowerCase() === selectedCategory.toLowerCase())
    .filter(p => p.name !== "products")
    .sort((a, b) => b.content.category.localeCompare(a.content.category));

  return (
    <section className="text-black flex flex-col">
      <div className="px-20 py-15">
        <h1 className={CMS.classNames.midTitleClass}>{blok?.title}</h1>
        <p className={CMS.classNames.midDescriptionClass}>{blok?.description}</p>
      </div>

      <div className="flex flex-row px-20 w-[50] gap-3">
        <button
          onClick={() => handleCategoryClick("")}
          className={`${CMS.classNames.linkClass} ${selectedCategory === "" ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-100"}`}
        >
          All products
        </button>
        {blok.categories?.map(category => {
          const isActive = selectedCategory === category.title;
          return (
            <button
              onClick={() => handleCategoryClick(category.title)}
              key={category._uid}
              className={`${CMS.classNames.linkClass} ${isActive ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-100"}`}
            >
              {category.title}
            </button>
          );
        })}
      </div>

      <div className="px-20">
        {loadedProducts?.length === 0 ? (
          <p>Loading products...</p>
        ) : filteredProducts?.length === 0 ? (
          <p>No products found matching your criteria...</p>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {filteredProducts.map(product => {
              const { slug } = product;
              const { _uid, title, image, price } = product.content;

              return (
                <div key={_uid} className="w-full">
                  <Link href={`/products/${slug}`}>
                    <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden rounded-lg">
                      <img
                        src={image?.filename}
                        alt={title}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </Link>
                  <h2 className="text-black font-extrabold mt-2">{title}</h2>
                  <p className="text-black">${price}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
