import {
    storyblokEditable,
} from '@storyblok/react/rsc';
import { CMS } from '@/utils/cms';



export default function Product({ blok }) {


    const colorChart = {
        red: "bg-red-500",
        blue: "bg-blue-500",
        green: "bg-green-500",
        white: "bg-white",
        black: "bg-black"
    }

    return (
        <main {...storyblokEditable(blok)} className='text-black flex flex-row p-25'>

            <img src={blok.image?.filename} alt={blok.title} width={300} height={300} />
            <div className='px-25 py-15 flex flex-col gap-5'>
                <div>
                    <h2 className={CMS.classNames.midTitleClass}>{blok.title}</h2>
                    <p className={CMS.classNames.smallDescriptionClass}>${blok.price}</p>
                </div>
                <p className={CMS.classNames.smallDescriptionClass}>{blok.description}</p>
                <div>
                    <p className='text-gray-500'>{blok.color_title}</p>
                    {blok.colors && blok.colors?.map(color => {
                        return <span className={`w-6 h-6 rounded-full border ${colorChart[color.color]} inline-block mr-2`} key={color.color}></span>
                    })}
                </div>
                <div className="flex flex-row gap-2">
                    {blok.sizes && blok.sizes?.map(size =>
                        <span className='bg-gray-200 hover:bg-gray-300 border w-10 text-center' key={size.size}>{size.size}</span>)}
                </div>
            </div>
        </main>
    );
}