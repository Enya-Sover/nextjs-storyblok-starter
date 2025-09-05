import { storyblokEditable } from "@storyblok/react";
import { CMS } from "@/utils/cms";
import Link from "next/link";


export default async function Latest_products({ blok }) {
    const products = await CMS.getThreeProducts();
    console.log("filtered products:", products);

    return (
        <div
            {...storyblokEditable(blok)} className="text-black flex flex-col">
            <div className="flex flex-col justify-center items-center text-center h-full m-15">
                <h1 className={CMS.classNames.midTitleClass}>{blok.title}</h1>
                <p className={CMS.classNames.smallDescriptionClass}>{blok.description}</p>
                {blok.button && blok.button.map((link, i) => (
                    <Link href={link.link.cached_url} className={CMS.classNames.linkClass} key={i} >{link.title}</Link>))}
            </div>
            <div className="grid grid-cols-3 gap-2 w-max mx-auto">

                {products.map((product, i) => {
                    const { title, image } = product.content;
                    return (
                        <div key={product.uuid} className={i === 0 || i=== 2 ? "py-25" : ""}>
                            <Link href={`/${product.full_slug}`}>
                                <img src={image?.filename} alt={title} width={200} height={200} />
                            </Link>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}