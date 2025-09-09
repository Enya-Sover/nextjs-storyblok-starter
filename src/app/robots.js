export default function robots() {
    const baseUrl = 'https://nextjs-storyblok-starter-sigma.vercel.app/'
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/global/',
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    }
  }