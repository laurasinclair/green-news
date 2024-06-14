// turns a string into a slug
// useful for for article titles
export function getSlug(str) {
	if (!str) return;
	if (typeof str === 'string') {
		const tempString = str
			.replaceAll(/[^a-zA-Z0-9]/g, '-')
			.toLowerCase()
			.substring(0, 50);
		return tempString.replace(/-+/g, '-').replace(/-$/, '');
	}
}

// truncating a string if it's too long
export function truncate(str) {
	if (!str) return;
	return str && str.length > 145 ? str.substring(0, 145) + '...' : str;
}

// turning date into a readable thing
export const publishedDate = (d) => {
	const date = new Date(d);

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
		hour12: false,
	};

	return date.toLocaleString('en-GB', options);
};

import { getData, storeData } from './LocalStorage';
export { getData, storeData };