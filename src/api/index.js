import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const API_KEY = import.meta.env.VITE_MONGODB_API_KEY;

export const fetchUser = async (username) => {
	try {
		const response = await axios.get(`${BASE_URL}/users/${username}`, {
			headers: {
				'api-key': API_KEY,
			},
		});

		if (response.status < 200 || response.status >= 300) {
			throw new Error('There was a problem fetching articles');
		}

		const { data } = response;
		return data;
	} catch (error) {
		return error.message;
	}
};

export const fetchArticles = async (page) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/api/articles?page=${page || 1}`
		);

		if (response.status < 200 || response.status >= 300) {
			throw new Error('There was a problem fetching articles');
		}
		console.log(response);

		const { articles, totalArticles } = await response.data;
		return { articles, totalArticles };
	} catch (error) {
		console.error(error.message);
	}
};

export const fetchArticle = async (articleId) => {
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
	} catch (error) {
		console.error(error.message);
	}
};
