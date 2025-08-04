import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL as string;

export const fetchUser = async (username: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/users/${username}`);

		if (response.status < 200 || response.status >= 300) throw new Error('There was a problem fetching articles');

		return response.data;
	} catch (error: any) {
		console.error("❌ fetchUser()", error);
		return null
	}
};
let canFetch = true;

export const fetchArticles = async (page: number) => {
	if (!canFetch) {
		console.warn("Too many requests for now.");
		return;
	}

	canFetch = false;
	setTimeout(() => {
		canFetch = true;
	}, 20000);

	try {
		const response = await axios.get(
			`${BASE_URL}/api/articles?page=${page || 1}`
		);

		if (response.status < 200 || response.status >= 300)
			throw new Error(`${response.status} - ${response.statusText}`);

		const { articles, totalArticles } = response.data;
		return { articles, totalArticles };
	} catch (error: any) {
		// console.error("❌ fetchArticles()", error.message);
	}
};

export const fetchArticle = async (articleId: string) => {
	const req = {
		articleId, // nyt://article/1c2d620b-c2f2-50e9-a3ed-c2a362ddbca4
	};

	try {
		const response = await axios.post(
			`${BASE_URL}/api/articles/article`,
			req
		);
		if (response.status < 200 || response.status >= 300) throw new Error('There was a problem fetching one article');

		console.log(response.data)
		const { articles, totalArticles } = response.data;
		return { articles, totalArticles };
	} catch (error: Error | unknown) {
		error instanceof Error
			? console.error(error.message)
			: console.error('An unexpected error occurred', error);
	}
};
