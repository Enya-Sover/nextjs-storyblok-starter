
import { storyblokEditable } from "@storyblok/react";

const bigTitleClass = "font-bold text-4xl md:text-5xl lg:text-6xl text-black"
const descriptionClass = "text-lg md:text-xl lg:text-2xl text-bold text-gray-400 w-[60%]"

export default function About({ blok }) {
// console.log("about us", blok)
    return (
        <div {...storyblokEditable(blok)} className="flex flex-col gap-15 justify-center items-center text-center h-full m-15" >
            <div className="flex flex-col items-center gap-7">
                <h1 className={bigTitleClass}>{blok.title}</h1>
                <div className={descriptionClass}>{blok.description}</div>
                <p>hej från about</p>
            </div>

        </div>
    )
}