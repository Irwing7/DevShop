/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'dummyimage.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: '',
          pathname: '/f/**',
        },
        {
          protocol: 'https',
          hostname: 'another-domain.com',
          port: '',
          pathname: '/path/to/images/**',
        },
        // Add additional domains as necessary
      ],
    },
  };
  
  export default nextConfig;
  