import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";



export default async function Header({ blok }) {
  // const headerLinks = await CMS.getProducts();

  return (
    <div
      {...storyblokEditable(blok)} className="border-b border-black text-black flex flex-row gap-10 p-3 pl-25" style={{backgroundImage: `url(${blok?.logo?.filename})`}}
    >             

        {blok.links.map((link, i)=> {
          return   <Link href={link.links.cached_url} className={i === 0 ? "font-extrabold": ""} key={i} >{link.label}</Link>
        })}        
    </div>
  );
}
