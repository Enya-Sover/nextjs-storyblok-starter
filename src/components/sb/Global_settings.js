import { storyblokEditable } from "@storyblok/react";


export default function Global_settings({ blok }) {
  return (
    <div
      {...storyblokEditable(blok)}>
      
    </div>
  );
}
