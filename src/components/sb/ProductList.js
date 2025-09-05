"use client"
import { CMS } from "@/utils/cms";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProductList({ blok }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    CMS.getProducts().then(data => setProducts(data));
  }, []);

  const handleCategoryClick = (title) => setSelectedCategory(title)

  const filterByCategory = (product) => {
    if (!selectedCategory) return true;
    return product.content.categories?.some(cat => cat.title === selectedCategory);
  }

  return (
    <section className="text-black flex flex-col">
      <div className="px-20 py-15">

        <h1 className={CMS.classNames.midTitleClass}>{blok?.title}</h1>
        <p className={CMS.classNames.midDescriptionClass}>{blok?.description}</p>
      </div>
      <div>
        {blok.categories.map(category => {
          return <button onClick={() => handleCategoryClick(category.title)} key={category._uid}
            className={CMS.classNames.linkClass}>{category.title}</button>
        })}
      </div>
      <div className="flex flex-row px-20">
        {products.length > 0 ? products.filter(filterByCategory).map(product => {
          const { slug } = product;
          const { _uid, title, image, price } = product.content;

          return (
            <div key={_uid}>
              <Link href={`/products/${slug}`}>
                <img src={image?.filename} alt={title} width={200} height={200} />
                <h2 className="text-black">{title}</h2>
                <p className="text-black">${price}</p>
              </Link>
            </div>
          )
        }): <p>Loading products...</p>}
      </div>
    </section>
  )
}
