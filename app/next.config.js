/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@privy-io/react-auth',
  '@privy-io/wagmi',
  '@tanstack/react-query',
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
  webpack(config, { isServer }) {
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
      crypto: false,
      stream: false,
      http: false,
      https: false,
      os: false,
      url: false,
      zlib: false,
      buffer: false,
      encoding: false,
    };

    // Don't parse node_modules, except the ones we're transpiling
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
});
