/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	trailingSlash: true,
	productionBrowserSourceMaps: true,
	images: {
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: 43200,
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
	},
	eslint: {
		dirs: ['pages', 'components', 'utils'],
	},
	httpAgentOptions: {
		keepAlive: true,
	},
	experimental: {
		esmExternals: true
	},
}

module.exports = nextConfig
