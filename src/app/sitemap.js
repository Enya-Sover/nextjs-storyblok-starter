import { getStoryblokApi } from '@/lib/storyblok'



export default async function sitemap() {


try {
    
    const baseUrl = 'https://nextjs-storyblok-starter-sigma.vercel.app'

    const staticPaths = [
        {
            url: `${baseUrl}/home/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1
        },
        {
            url: `${baseUrl}/products/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8
        },
        {
            url: `${baseUrl}/about-us/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8
        }
    ]


    const storyblok = getStoryblokApi()
    const products = await storyblok.get("cdn/stories/", {
        version: "published",
        starts_with: "products"
    })

    const dynamicPaths = products.data.stories.map(product => ({
        url: `${baseUrl}/products/${product.slug}/`,
        lastModified: new Date(product.updated_at) || new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
    }))
    return [...staticPaths, ...dynamicPaths]


} catch (error) {
    console.error("An error:", error)
    return []
}

}