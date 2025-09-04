import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { CMS } from "@/utils/cms";



export default async function Header({ blok }) {
  // const headerLinks = await CMS.getProducts();
// console.log("header blok",blok)
  return (
    <div
      {...storyblokEditable(blok)} className="w-full bg-fixed min-h-[150px]" style={{backgroundImage: `url(${blok?.logo?.filename})`}}
    >             

        {blok.links.map((link, i)=> {
          console.log("link",link)
          return   <Link href={link.links.cached_url} key={i} >{link.label}</Link>
        })}        
    </div>
  );
}
