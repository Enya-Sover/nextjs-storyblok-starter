import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";



export default async function Header({ blok }) {
  // const headerLinks = await CMS.getProducts();

  return (
    <div
      {...storyblokEditable(blok)} className="w-full bg-fixed min-h-[150px]" style={{backgroundImage: `url(${blok?.logo?.filename})`}}
    >             

        {blok.links.map((link, i)=> {
          return   <Link href={link.links.cached_url} key={i} >{link.label}</Link>
        })}        
    </div>
  );
}
