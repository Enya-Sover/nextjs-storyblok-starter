import { storyblokEditable } from "@storyblok/react";
import { CMS } from "@/utils/cms";

export default function Footer({ blok }) {
 
  return (
    <div
      {...storyblokEditable(blok)} className="text-black p-25"
    >
      <h2 className={CMS.classnames.bigTitleClass}>{blok.title}</h2>
      <p className={CMS.classnames.descriptionClass}>{blok.description}</p>
      {blok.form && blok.form.map((item, i) => {
        return (
          <form key={i} action="#" className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder={item.placeholder}
                className="border p-2 w-full pr-16"
              />
              <button className="absolute right-0 top-0 h-full px-4 text-black">
                {item.button_text}
              </button>
            </div>
          </form>
        )
      })}

    </div>
  );
}

