
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";


export default async function Three_latest_products({ blok, products }) {
    const latestProducts = products?.sort((a, b) => new Date(b.content.created_at) - new Date(a.content.created_at)).filter(a => a.name !== "products").slice(0, 3);
    
    return (
        <div
            {...storyblokEditable(blok)} className="text-black flex flex-col">
            <div className="grid grid-cols-3 gap-2 w-max mx-auto">
                {latestProducts?.map((product, i) => {
                    const { title, image } = product.content;
                    return (
                        <div key={product.uuid} className={i === 0 || i === 2 ? "py-25" : ""}>
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