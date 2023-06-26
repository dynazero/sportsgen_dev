module.exports = {
  images: {
    domains: ['sportsgenph.sgp1.digitaloceanspaces.com', 'sportsgenph.sgp1.cdn.digitaloceanspaces.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false,
      };

      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });

      config.externals = {
        ...config.externals,
        kerberos: 'commonjs kerberos',
        '@mongodb-js/zstd': 'commonjs @mongodb-js/zstd',
        '@aws-sdk/credential-providers': 'commonjs @aws-sdk/credential-providers',
        snappy: 'commonjs snappy',
        aws4: 'commonjs aws4',
        'mongodb-client-encryption': 'commonjs mongodb-client-encryption'
      };
    }

    return config;
  },
};
