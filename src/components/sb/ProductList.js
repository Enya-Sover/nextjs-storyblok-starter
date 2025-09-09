"use client"
import { CMS } from "@/utils/cms";
import Link from "next/link";
import { useState } from "react";

export default function ProductList({ blok, products }) {
  console.log("blok: ", blok)

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (title) => setSelectedCategory(title)

  const filterByCategory = (product) => {
    if (!selectedCategory) return true

    return (product.content.category?.toLowerCase() === selectedCategory.toLowerCase())
  }

  return (
    <section className="text-black flex flex-col">
      <div className="px-20 py-15">

        <h1 className={CMS.classNames.midTitleClass}>{blok?.title}</h1>
        <p className={CMS.classNames.midDescriptionClass}>{blok?.description}</p>
        
      </div>
      <div className="flex flex-row px-20 w-[50] gap-3">
        {blok.categories?.map(category => {
          const isActive = selectedCategory === category.title;
          return <button onClick={() => handleCategoryClick(category.title)} key={category._uid}
            className={`${CMS.classNames.linkClass} ${isActive ? "bg-black text-white " : "bg-white text-black hover:bg-neutral-100"}`}>{category.title}</button>
        })}
      </div>
      <div className="px-20">
        {products.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {products
              .filter(filterByCategory)
              .filter(product => product.name !== "products")
              .map(product => {
                const { slug } = product;

                const { _uid, title, image, price } = product.content;

                return (
                  <div key={_uid} className="w-full">
                    <Link href={`/products/${slug}`}>
                      <img
                        src={image?.filename}
                        alt={title}
                        className="w-full h-auto object-cover"
                      />
                      <h2 className="text-black font-extrabold mt-2">{title}</h2>
                      <p className="text-black">${price}</p>
                    </Link>
                  </div>
                );
              })}
          </div>
        ) : (
          <p>Loading products...</p>
        )}
      </div>

    </section>
  )
}
