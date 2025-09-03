// // app/[...slug]/page.js

// import { getStoryblokApi } from "@/lib/storyblok";
// import { StoryblokStory } from "@storyblok/react/rsc";
// import { notFound } from "next/navigation";

// export default async function Page({ params }) {
//   try {
//     console.log("params", params);
//     if (!params || !params.slug) {
//       throw new Error("Slug parameter is missing");
//     }
//     const { slug } = await params;

//     const data = await fetchData(slug);
//     console.log("slug data", data);

//     if (!data?.story) return notFound();

//     return <StoryblokStory story={data.story} />;
//   } catch (error) {
//     console.error("Storyblok fetch error:", error);
//     return notFound();
//   }
// }

// export async function fetchData(slug) {
//   const storyblokApi = getStoryblokApi();
//   const realSlug = slug ? slug.join("/") : "home";
//   const { data } = await storyblokApi.get(`cdn/stories/${realSlug}`, {
//     version: "draft",
//   });
//   return data;
// }
