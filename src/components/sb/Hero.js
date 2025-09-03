
import { storyblokEditable } from "@storyblok/react";

const bigTitleClass = "font-bold text-4xl md:text-5xl lg:text-6xl text-black"
const linkClass = "text-black hover:bg-neutral-100 border-1 py-2 px-15 border-black inline-block" 
const descriptionClass = "text-lg md:text-xl lg:text-2xl text-bold text-gray-400 w-[60%]"

export default function Hero({ blok }) {

    return (
        <div className="flex flex-col gap-15 justify-center items-center text-center h-full m-15" {...storyblokEditable(blok)} >
            <div className="flex flex-col items-center gap-7">
                <h1 className={bigTitleClass}>{blok.title}</h1>
                <div className={descriptionClass}>{blok.description}</div>
                {blok.links && blok.links.map(link => (
                    <p
                        key={link._uid}
                        className={linkClass}
                    >
                        {link.title}
                    </p>
                ))}

                <img className="w-100 h-100" src={`${blok?.image?.filename}`} alt="Oops här saknas en bild"></img>
            </div>

        </div>
    )
}