import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const API_KEY = import.meta.env.VITE_MONGODB_API_KEY;

export const fetchUsers = async () => {
	const response = await fetch(`${BASE_URL}/users/johndoe01`, {
		headers: {
			'api-key': API_KEY,
		},
	});

	const data = await response.json();
	return data;
};

export const fetchArticles = async (page) => {
	const response = await axios.get(
		`${BASE_URL}/api/articles?page=${page || 0}`
	);
	const { articles, totalArticles } = response.data;
	return { articles, totalArticles };
};

export const fetchArticle = async (articleId) => {
	const req = {
		headers: {
			articleId: articleId, // nyt://article/1c2d620b-c2f2-50e9-a3ed-c2a362ddbca4
		},
	};

	const response = await axios.get(
		`${BASE_URL}/api/articles?articleId=${req}`, req
	);
	const { articles, totalArticles } = response.data;
	return { articles, totalArticles };
};

export const fetchSavedArticles = async (username) => {
	const response = await axios.get(
		`${BASE_URL}/users/${username}/savedarticles`
	)
	return response.data;
};
