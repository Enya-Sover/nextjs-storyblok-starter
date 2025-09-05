import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { CMS } from "@/utils/cms";

export default function Footer({ blok }) {

  return (
    <div
      {...storyblokEditable(blok)} className="text-black p-25 flex flex-row gap-10"
    >
      <div className="flex flex-col">
        <h2 className={CMS.classNames.midTitleClass}>{blok.title}</h2>
        <p className={CMS.classNames.smallDescriptionClass}>{blok.description}</p>
        {blok.form && blok.form.map((item, i) => {
          return (
            <form key={i} action="#" className="flex gap-2">
              <div className="relative flex-1 mw-100" >
                <div className="relative w-[60%]">
                  <input
                    type="email"
                    placeholder={item.placeholder}
                    className="border text-sm p-2 w-full pr-20" 
                  />
                  <button
                    type="submit"
                    className="absolute text-sm font-bold right-0 top-0 h-full px-4"
                  >
                    {item.button_text}
                  </button>
                </div>

              </div>
            </form>
          )
        })}
      </div>


      <div className="flex flex-col">
        {blok.shop?.map((link, i) => <Link className={i === 0 ? "font-extrabold pb-5": ""}  href={link.url || ""} key={link._uid} >{link.title}</Link>)}
      </div>
      <div className="flex flex-col">
        {blok.help?.map((link, i) => <Link className={i === 0 ? "font-extrabold pb-5": ""}  href={link.url || ""} key={link._uid} >{link.title}</Link>)}
      </div>
      <div className="flex flex-col">
        {blok.about?.map((link, i) => <Link className={i === 0 ? "font-extrabold pb-5": ""} href={link.url || ""} key={link._uid} >{link.title}</Link>)}
      </div>

    </div>
  );
}

