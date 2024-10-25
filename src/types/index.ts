declare global {
	namespace NodeJS {
		interface Window {
			name: string;
			slogan: string;
		}
	}
	type ErrorState = string | undefined;
}

export type SVGProps = {
	size?: number;
	color?: string;
	className?: string;
	width?: number;
	height?: number;
};

export type HeroType = {
	size?: 's' | 'm' | 'l';
	title: string;
	h3?: string;
	leadText?: string;
	hasLogo?: boolean;
	className?: string;
};

export type LogoSizes = 'xs' | 's' | 'm' | 'l';

export interface LogoType {
	size?: LogoSizes;
	color?: string;
	hasText?: boolean;
}

export type Article = {
	_id: string;
	articleTitle: string;
	headline: {
		main: string;
	};
	snippet: string;
	multimedia?: { url: string | undefined }[];
	byline?: {
		original?: string;
		person?: {
			firstname?: string;
			middlename?: string;
			lastname?: string;
		}[];
	};
	pub_date?: string;
	source?: string;
	publishedAt?: string;
	lead_paragraph?: string;
	web_url?: string;
};

export type User = {
	_id: string | undefined;
	isLoggedIn: boolean;
	userInfo: {
		username: string | undefined;
		firstName: string | undefined;
		lastName: string | undefined;
		savedArticles: Article[];
		profilePicture: string | undefined;
	};
};

export type StatusType = {
	type: 'loading' | 'error' | null;
	message?: string | undefined;
};

export type Paths = {
	base: string;
	articles: string;
	user: string;
};
