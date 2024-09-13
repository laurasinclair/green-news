export const getData = async (key) => {
	const data = await localStorage.getItem(key);
	if (!data || data === 'undefined') return;

	try {
		return JSON.parse(data);
	} catch (err) {
		console.error(`Error getting item ${key} from localStorage`, err);
	}
};

export const storeData = (key, item) => {
	if (!localStorage) return;

	try {
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.error(`Error storing item ${key} to localStorage`, err);
	}
};
