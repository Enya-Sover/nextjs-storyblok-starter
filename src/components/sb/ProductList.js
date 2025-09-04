import { CMS } from "@/utils/cms";
import Link from "next/link";

export default async function ProductList({ blok }) {
   
    const products = await CMS.getProducts();
    const filteredProducts = await products.filter((product) => blok?.products.includes(product.uuid));
    return (
      <section className="text-black flex flex-col">
        <h1>{blok?.title}</h1>
        <p>{blok?.description}</p>
        <div className="flex flex-row">
          {filteredProducts.length > 0 ? filteredProducts?.map((product) => {
            const { slug } = product;

            const { _uid, title, description, image, price } = product.content;
            return (
                <div key={_uid} >
              <Link  href={`/products/${slug}`} key={_uid}>
                  <img src={image?.filename} alt={title} width={200} height={200} />
                  <h2 className="text-black">{title}</h2>
                  <p className="text-black">${price}</p>

              </Link>
                </div>
            )
          }): <p>Loading products...</p>}
        </div>
      </section>
    )
  }
  