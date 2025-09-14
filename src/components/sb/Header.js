"use client"
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header({ blok, categories, products }) {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const filteredProducts = products.filter(p => p.name !== "products");

  // Set med alla kategorier
  const categorySet = new Set(categories.map(cat => cat.toLowerCase()));

  const handleSearch = (e) => {
    e.preventDefault();
    const value = query.toLowerCase().trim();
  
    const productMatch = filteredProducts.find(
      p => p.content.title.toLowerCase() === value
    );
  
    if (productMatch) {
      router.push(`/products/${productMatch.slug}`);
      setErrorMessage("");
      return;
    }
  
    // 2. Kolla om sökordet matchar en kategori
    if (categorySet.has(value)) {
      router.push(`/products?category=${value}`);
      setErrorMessage("");
      return;
    }
  
    // 3. Annars visa fel
    setErrorMessage(`"${query}" not found`);
  };
  

  const searchBar = blok.form?.[0];

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <div
      {...storyblokEditable(blok)}
      className="border-b border-black text-black flex flex-row items-center justify-between"
      style={{ backgroundImage: `url(${blok?.logo?.filename})` }}
    >
      <div className="flex flex-row gap-10 p-3 pl-25">
        <nav className="flex gap-4">
          {blok.links?.map((link, i) => {
            const href = link.links.cached_url.startsWith("/")
              ? link.links.cached_url
              : "/" + link.links.cached_url;

            const isProducts = href.includes("products");

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
                  <ul
                    className="absolute top-full left-0 bg-white border shadow-lg w-48"
                    onMouseLeave={() => setOpen(false)}
                  >
                    {categories.map((cat) => (
                      <Link
                        href={`/products?category=${cat.toLowerCase()}`}
                        key={cat}
                      >
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
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

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchBar?.placeholder || "Search category..."}
            className="border px-2 py-1"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-black text-white hover:bg-gray-800"
          >
            Search
          </button>
        </form>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>

      <p className="px-10">👜 3</p>
    </div>
  );
}
