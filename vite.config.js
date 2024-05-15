import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';
import removeConsole from "vite-plugin-remove-console";

// https://vitejs.dev/config/
export default defineConfig({
	base: '/', // Set the base directory
	plugins: [react(), removeConsole()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@components': `${path.resolve(__dirname, 'src/components/')}`,
			'@assets': `${path.resolve(__dirname, 'src/assets/')}`,
			'@img': `${path.resolve(__dirname, 'src/assets/images/')}`,
			'@pages': path.resolve(__dirname, 'src/pages')
		},
	},
	build: {
		cssCodeSplit: false,
		cssMinify: 'esbuild'
	}
})
