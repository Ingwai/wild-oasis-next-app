/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pzvudjrvgrxmadjlnaky.supabase.co',
				port: '',
				pathname: '/storage/v1/object/public/cabin-images/**',
			},
		],
		// unoptimized: true,
	},
	// output: 'export',
};

export default nextConfig;
