declare global {
	namespace NodeJS {
		interface Global {
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
	hasText?: boolean;
}

export type Article = {
	_id: string | undefined;
	articleTitle: string | undefined;
	headline: {
		main: string | undefined;
	};
	multimedia?: { url: string | undefined }[];
	byline?: {
		original?: string;
		person?: {
			firstname: string | undefined;
			middlename: string | undefined;
			lastname?: string | undefined;
		}[];
	};
	pub_date: string | undefined;
	source: string | undefined;
	publishedAt: string | undefined;
	snippet: string | undefined;
	lead_paragraph: string | undefined;
	web_url: string | undefined;
};

export type User = {
	_id: string | undefined;
	isLoggedIn: boolean;
	userInfo: {
		username: string | undefined;
		firstName: string | undefined;
		lastName: string | undefined;
		savedArticles: string[];
		profilePicture: string | undefined;
	};
};
