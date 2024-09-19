declare module '*.module.sass' {
	const content: Record<string, string>;
	export default content;
}

declare module 'components';
declare module 'context';
declare module 'images/*';
declare module 'pages';
declare module 'router';
declare module 'router/*';
declare module 'src';
declare module 'src/*';
declare module 'types';
declare module 'utils';
declare module 'utils/*';

declare const paths: {
	base: string;
	articles: string;
	user: string;
};

interface ImportMetaEnv {
	VITE_BACKEND_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
