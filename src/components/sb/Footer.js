import { storyblokEditable } from "@storyblok/react";


export default function Footer({ blok }) {

  return (
    <div
      {...storyblokEditable(blok)}
    >
        <p>HEJ FRÅN FOOTER!!!!!!</p>
        {/* <img src={`${blok.logo.filename}`}></img> */}
    </div>
  );
}
