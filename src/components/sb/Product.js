import { storyblokEditable } from "@storyblok/react";


export default function Products({ blok }) {
const classNameToUseLater = "grid gap-4 w-full grid-cols-[repeat(auto-fit,minmax(15.625rem,1fr))]"
  return (
    <div
      {...storyblokEditable(blok)}
      className="text-black flex flex-col"
    >
      <h1>{blok.title}</h1>
      <p>{blok.description}</p>
    </div>
  );
}