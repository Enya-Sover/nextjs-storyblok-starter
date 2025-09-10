"use client"
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { useState } from "react";
import { CMS } from "@/utils/cms";


export default function Header({ blok }) {

  const [searchProp, setSearchProp] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSearchProp = (value) => {
    setSearchProp(value)
    CMS.getProduct(value).then(data => {
      if (data) {
        window.location.href = `/products/${data.slug}`
      } else {
        setErrorMessage(`Product ${value} not found`)
      }
    }).catch (err => {
      setErrorMessage(`Product "${value}" not found`)
    })
  }

  const searchBar = blok.form[0]
  return (
    <div
      {...storyblokEditable(blok)} className="border-b border-black text-black flex flex-row gap-10 p-3 pl-25" style={{ backgroundImage: `url(${blok?.logo?.filename})` }}
    >

      {blok.links.map((link, i) => {
        const href = link.links.cached_url.startsWith("/")
          ? link.links.cached_url
          : "/" + link.links.cached_url

        return <Link href={href} className={i === 0 ? "font-extrabold" : ""} key={i} >{link.label}</Link>
      })}

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
  );
}
