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

export const storeData = (key: string, item: User) => {
	if (!localStorage) return;

	try {
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.warn(`Error storing item ${key} to localStorage`, err);
	}
};
