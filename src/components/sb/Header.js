import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { CMS } from "@/utils/cms";



export default async function Header({ blok }) {
  // const headerLinks = await CMS.getProducts();
console.log("header blok",blok)
  return (
    <div
      {...storyblokEditable(blok)} className="w-full bg-fixed min-h-[150px]" style={{backgroundImage: `url(${blok?.logo?.filename})`}}
    >             

        {blok.links.map((link, i)=> {
          return   <div key={i} >{link.label}</div>
        })}        
    </div>
  );
}
