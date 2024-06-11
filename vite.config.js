import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@components': `${path.resolve(__dirname, 'src/components/')}`,
			'@context': `${path.resolve(__dirname, 'src/context/')}`,
			'@assets': `${path.resolve(__dirname, 'src/assets/')}`,
			'@img': `${path.resolve(__dirname, 'src/assets/images/')}`,
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@utils': path.resolve(__dirname, 'src/utils')
		},
	},
	build: {
		outDir: '/projects/green-news/',
		cssCodeSplit: false,
		cssMinify: 'esbuild',
		minify: 'esbuild'
	}
})
