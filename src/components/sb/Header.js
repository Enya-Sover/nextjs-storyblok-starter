import { storyblokEditable } from "@storyblok/react";




export default async function Header({ blok }) {


  return (
    <div
      {...storyblokEditable(blok)} className="w-full bg-fixed min-h-[150px]" style={{backgroundImage: `url(${blok?.logo?.filename})`}}
    >             
     
        <p>HEJ FRÅN HEADER!!!</p>
    </div>
  );
}
