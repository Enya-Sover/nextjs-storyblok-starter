import { getStoryblokApi } from "@storyblok/react/rsc";


export class CMS {
    static classNames = {
        bigTitleClass: "font-bold text-4xl text-black",
        midTitleClass: "font-extrabold text-3xl text-black py-3",
        descriptionClass: "text-lg md:text-xl lg:text-2xl text-bold text-gray-400 w-[60%]",
        midDescriptionClass: "text-base text-bold text-black w-[52%]",
        smallDescriptionClass: "text-sm text-bold text-black w-[79%] py-2",
        linkClass: "text-black hover:bg-neutral-100 border-1 py-2 px-15 border-black inline-block",


    }
    static async sbGet(path, params) {
        return getStoryblokApi().get(path, params);
    }

    static async getStory(params) {
        if (!params) params = "home";
        const { data } = await getStoryblokApi().get(
            `cdn/stories/${params}`,
            this.getDefaultSBParams()
        );
        return data.story;
    }

    static async getProducts() {
        const productsResponse = await this.sbGet("cdn/stories", {
            starts_with: "products/",
            version: "draft"
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
    
    static async getProduct(slug) {
        const { data } = await this.sbGet(`cdn/stories/products/${slug}`, this.getDefaultSBParams());
        return data.story;
    }

    static getDefaultSBParams() {
        return {
            version: "draft",
            resolve_links: "url",
            cv: Date.now(),
        };
    }

    static async getStaticPaths() { }
}