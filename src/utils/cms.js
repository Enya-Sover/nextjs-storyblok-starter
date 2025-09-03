import { getStoryblokApi, useStoryblokApi } from "@storyblok/react/rsc";

export class CMS {
    static async sbGet(path, params) {
        return getStoryblokApi().get(path, params);
    }

    static async getStory(params) {
        if (!params) return {};
        const uri = params?.slug?.join("/");
        const { data } = await useStoryblokApi().get("cdn/stories/home", this.getDefaultSBParams());
        return data.story;
    }
    static async getProducts() {
        const productsResponse = await this.sbGet("cdn/stories", {
            starts_with: "products/",
            version: "draft",
        });

        return productsResponse.data.stories;
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