import { storyblokEditable } from "@storyblok/react";
import { CMS } from "@/utils/cms";
import Link from "next/link";


export default async function Latest_products({ blok }) {
  

    return (
        <div
            {...storyblokEditable(blok)} className="text-black flex flex-col">
            <div className="flex flex-col justify-center items-center text-center h-full m-15">
                <h1 className={CMS.classNames.midTitleClass}>{blok.title}</h1>
                <p className={CMS.classNames.smallDescriptionClass}>{blok.description}</p>

                {blok.button && blok.button.map((link, i) => (
                    <Link href={link.link.cached_url} className={CMS.classNames.linkClass} key={i} >{link.title}</Link>))}
            </div>
        </div>
    );
}