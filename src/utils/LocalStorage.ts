import { User } from "src/types";

export const getData = (key: string) => {
	try {
		const data = localStorage.getItem(key);
		if (!data || data === "undefined") throw new Error("User not found");
		return JSON.parse(data);
	} catch (err) {
		// console.warn(`getData() - ${key}: `, err);
		return;
	}
};

export const storeData = (key: string, item: object) => {
	if (!localStorage) return;

	try {
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.warn(`Error storing item ${key} to localStorage`, err);
	}
};

const STORAGE_KEY = "articles_cache";

export const storeArticles = (page: number, data: any) => {
	const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
	existing[page] = {
		data,
		timestamp: Date.now(),
	};
	localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const getCachedArticles = (page: number, maxAgeMs = 1000 * 60 * 5) => {
	const cache = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
	const entry = cache[page];

	if (!entry) return null;

	const isExpired = Date.now() - entry.timestamp > maxAgeMs;
	return isExpired ? null : entry.data;
};
