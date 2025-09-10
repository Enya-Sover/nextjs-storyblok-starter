import { getStoryblokApi } from "@/lib/storyblok"; // 👈 importera från din storyblok.js

export class CMS {
  static classNames = {
    bigTitleClass: "font-bold text-4xl text-black",
    midTitleClass: "font-extrabold text-3xl text-black py-3",
    descriptionClass:
      "text-lg md:text-xl lg:text-2xl text-bold text-gray-400 w-[60%]",
    midDescriptionClass: "text-base text-bold text-black w-[52%]",
    smallDescriptionClass: "text-sm text-bold text-black w-[79%] py-2",
    linkClass: "text-black border-1 py-1 px-5 border-black my-10",
  };

  static async sbGet(path, params) {
    return await getStoryblokApi().get(path, params);
  }

  static async getStory(params = "home") {
    const { data } = await getStoryblokApi().get(
      `cdn/stories/${params}`,
      this.getDefaultSBParams()
    );
    return data.story;
  }

  static async getProducts() {
    const productsResponse = await this.sbGet("cdn/stories", {
      starts_with: "products/",
      ...this.getDefaultSBParams()
    });

    return productsResponse.data.stories;
  }

  static async getThreeProducts(limit = 3) {
    const productsResponse = await this.sbGet("cdn/stories", {
      starts_with: "products/",
      version: "draft",
      sort_by: "created_at:desc",
      per_page: limit,
    });

    return productsResponse.data.stories;
  }
  static async getProductsByCategory(category) {
    // Hämta alla produkter
    const { data } = await this.sbGet(
      "cdn/stories/",
      this.getDefaultSBParams()
    );
  
    const products = data.stories.filter(
      (story) =>
        story.content?.category &&
        story.content.category.toLowerCase() === category.toLowerCase()
    );
  
    return products;
  }
  
  static async getProduct(slug) {
    const { data } = await this.sbGet(
      `cdn/stories/products/${slug}`,
      this.getDefaultSBParams()
    );
    return data.story;
  }

  static getDefaultSBParams() {
    return {
      version: process.env.VERCEL_ENV === "production" ? "published" : "draft",
      resolve_links: "url",
      cv: Date.now(),
    };
  }
}
