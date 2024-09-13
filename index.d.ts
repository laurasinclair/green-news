declare module '*.sass' {
	const content: { [key: string]: any };
	export = content;
}
declare module '*.scss' {
	const content: { [key: string]: any };
	export = content;
}
declare module '*.css' {
	const content: { [key: string]: any };
	export = content;
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