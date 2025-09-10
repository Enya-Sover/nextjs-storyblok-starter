
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { CMS } from "@/utils/cms";

export default function Hero({ blok }) {
const background_color = blok.background_color || "white";


    return (
        <div className="flex flex-col gap-15 justify-center items-center text-center h-full m-15"   style={{ backgroundColor: background_color}} {...storyblokEditable(blok)} >
            <div className="flex flex-col items-center gap-7">
                <h1 className={CMS.classNames.bigTitleClass}>{blok.title}</h1>
                <div className={CMS.classNames.descriptionClass}>{blok.description}</div>
                {blok.links && blok.links.map((link, i) => (
                    <Link href={link.link.cached_url} className={CMS.classNames.linkClass}key={i} >{link.title}</Link>
                ))}

                <img className="w-100 h-100" src={`${blok?.image?.filename}`} alt="Oops här saknas en bild"></img>
            </div>

        </div>
    )
}