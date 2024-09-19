import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL as string;
const API_KEY = import.meta.env.VITE_MONGODB_API_KEY as string;

export const fetchUser = async (username: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/users/${username}`);

		if (response.status < 200 || response.status >= 300) {
			throw new Error('There was a problem fetching articles');
		}

		return response.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
};

export const fetchArticles = async (page: number) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/api/articles?page=${page || 1}`
		);

		if (response.status < 200 || response.status >= 300) {
			throw new Error('There was a problem fetching articles');
		}

		const { articles, totalArticles } = await response.data;
		return { articles, totalArticles };
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
};

export const fetchArticle = async (articleId: string) => {
	const req = {
		headers: {
			articleId: articleId, // nyt://article/1c2d620b-c2f2-50e9-a3ed-c2a362ddbca4
		},
	};
	try {
		const response = await axios.get(
			`${BASE_URL}/api/articles?articleId=${req}`,
			req
		);
		if (response.status < 200 || response.status >= 300) {
			throw new Error('There was a problem fetching articles');
		}
		const { articles, totalArticles } = response.data;
		return { articles, totalArticles };
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
};
