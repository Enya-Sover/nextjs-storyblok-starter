// storyblok.js
import { apiPlugin, storyblokInit, getStoryblokApi } from "@storyblok/react/rsc";

import Page from "@/components/sb/Page";
import Teaser from "@/components/sb/Teaser";
import Grid from "@/components/sb/Grid";
import DoesNotExist from "@/components/sb/DoesNotExist";
import Hero from "@/components/sb/Hero";
import Header from "@/components/sb/Header";
import Footer from "@/components/sb/Footer";
import About from "@/components/sb/About";
import ProductList from "@/components/sb/ProductList";
import Global_settings from "@/components/sb/Global_settings";
import Latest_products from "@/components/sb/Latest_products";
import Product from "@/components/sb/Product";
import Three_latest_products from "@/components/sb/three_latest_products";

export const components = {
  three_latest_products: Three_latest_products,
  product: Product,
  global_settings: Global_settings,
  latest_products: Three_latest_products,
  productList: ProductList,
  about: About,
  header: Header,
  footer: Footer,
  page: Page,
  grid: Grid,
  teaser: Teaser,
  hero: Hero,
  doesNotExist: DoesNotExist,
};

storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_ACCESS_TOKEN || process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu"
  },
  components
});

export { getStoryblokApi };
