/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@privy-io/react-auth',
  '@privy-io/wagmi',
  '@base-org/account',
  'viem',
  'wagmi',
]);

module.exports = withTM({
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: false,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    // Fallback for packages that need node polyfills
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
});
