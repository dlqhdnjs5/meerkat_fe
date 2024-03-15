/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KAKAO_ADMIN: process.env.KAKAO_ADMIN,
    KAKAO_JAVASCRIPT_KEY: process.env.KAKAO_JAVASCRIPT_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/mapi/:path*',
        destination: `http://localhost:8090/:path*`,
      },
    ];
  },
}

export default nextConfig;
