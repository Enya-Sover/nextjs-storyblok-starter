"use client"
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { useState } from "react";
import { CMS } from "@/utils/cms";


export default function Header({ blok, categories, products }) {

  const [searchProp, setSearchProp] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [open, setOpen] = useState(false);

  const productMap = products.reduce((acc, product) => {
    acc[product?.content?.title?.toLowerCase()] = product.slug;
    return acc;
  }, {});

  const handleSearchProp = (value) => {
    setSearchProp(value);
    const slug = productMap[value.toLowerCase()]; 
    if (slug) {
      setErrorMessage("");
      window.location.href = `/products/${slug}`;
    } else {
      setErrorMessage(`Product "${value}" not found`);
    }
  };


  const searchBar = blok.form[0]
  return (
    <div
      {...storyblokEditable(blok)} className="border-b border-black text-black flex flex-row items-center justify-between" style={{ backgroundImage: `url(${blok?.logo?.filename})` }}
    >
      <div className="flex flex-row gap-10 p-3 pl-25">
        <nav className="flex gap-4">
          {blok.links.map((link, i) => {
            const href = link.links.cached_url.startsWith("/")
              ? link.links.cached_url
              : "/" + link.links.cached_url;

            const isProducts = href.includes("products");
            const capitalizeFirstLetter = (string) => {
              return string.charAt(0).toUpperCase() + string.slice(1);
            }

            return (
              <div key={i} className="relative">
                <Link
                  href={href}
                  className={i === 0 ? "font-extrabold" : ""}
                  onMouseEnter={() => isProducts && setOpen(true)}
                >
                  {link.label}
                </Link>

                {isProducts && open && (
                  <ul className="absolute top-full left-0 bg-white border shadow-lg w-48" onMouseLeave={() => isProducts && setOpen(false)}>
                    {categories.map(cat => (
                      <Link href="products" key={cat}>
                        <li 
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                          {capitalizeFirstLetter(cat)}
                        </li>

                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <form>
          <input onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearchProp(e.target.value)
            }
          }}
            placeholder={searchBar.placeholder}>
          </input>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      </div>
      <p className="px-10">👜 3</p>
    </div>
  );
}
