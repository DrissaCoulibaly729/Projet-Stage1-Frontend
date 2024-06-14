/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['https://projet-stage1-backend.onrender.com'],
    },  
};
export default nextConfig;


//   /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'http',
//           hostname: 'localhost',
//           port: '5000',
//           pathname: '/**',
//         },
//         {
//           protocol: 'http',
//           hostname: 'localhost',
//           port: '',
//           pathname: '/**',
//         },
//       ],
//     },
//   };
  
//   export default nextConfig;
  