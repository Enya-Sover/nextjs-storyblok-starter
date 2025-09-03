import { CMS } from "@/utils/cms";
import Link from "next/link";

export default async function ProductList({ blok }) {
   
    const products = await CMS.getProducts();
    const filteredProducts = products.filter((product) => blok?.products.includes(product.uuid));
    // console.log("hela blok", blok)
    return (
      <section       className="text-black flex flex-col">
        <h1>{blok?.title}</h1>
        <p>{blok?.description}</p>
        <div>
          {filteredProducts.map((product, i) => {
            const { slug } = product;
            console.log("product", product)
            const { _uid, title, text, image, price } = product.content;
            return (
              <Link href={`/products/${slug}`} key={_uid}>
                <div key={_uid}>
                  <img src={image?.filename} alt={title} width={200} height={200} />
                  <h2 className="text-black">{title}</h2>
                  <p className="text-black">${price}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    )
  }
  