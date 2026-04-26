/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swiperjs.com", // السماح لموقع سويبر
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com", // ضيف ده كمان عشان صور الـ API بتاعة FreshCart تشتغل
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
