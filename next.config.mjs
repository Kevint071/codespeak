/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
        port: "",
        pathname:
          "/shutterstock/photos/1912904167/display_1500/stock-photo-giant-moa-bird-dinornithiformes-realistic-drawing-illustration-for-the-encyclopedia-of-ancient-1912904167.jpg",
      },
      {
        protocol: "https",
        hostname: "digitalsynopsis.com",
        port: "",
        pathname: "/wp-content/uploads/2017/02/beautiful-color-gradients-backgrounds-001-warm-flame.png",
      },
    ],
  },
};

export default nextConfig;
