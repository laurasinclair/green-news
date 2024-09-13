/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/projects/green-news/' : './',
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			src: path.resolve(__dirname, '/src'),
			components: `${path.resolve(__dirname, '/src/components/')}`,
			context: `${path.resolve(__dirname, '/src/context/')}`,
			assets: `${path.resolve(__dirname, '/src/assets/')}`,
			images: `${path.resolve(__dirname, '/src/assets/images/')}`,
			pages: path.resolve(__dirname, '/src/pages'),
			utils: path.resolve(__dirname, '/src/utils'),
			router: path.resolve(__dirname, '/src/router'),
			types: path.resolve(__dirname, '/src/types'),
			api: path.resolve(__dirname, '/src/api'),
		},
	},
	build: {
		cssCodeSplit: false,
		cssMinify: 'esbuild',
		minify: 'esbuild',
	},
});
