/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const nextConfig =
{
    output: 'export',
    assetPrefix: './',
    crossOrigin: false,
    webpack: (config) =>
    {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack']
        });

        config.externals = [...config.externals, { canvas: 'canvas' }];

        return config;
    },
    images:
    {
        unoptimized: true,
        remotePatterns:
        [
            {
                protocol: 'https',
                hostname: '**'
            },
            {
                protocol: 'http',
                hostname: '**'
            }
        ]
    }
};

module.exports = nextConfig;
