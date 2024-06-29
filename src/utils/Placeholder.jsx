import React from 'react';

const placeholderImages = [
	'/src/assets/images/bart-zimny-W5XTTLpk1-I-unsplash.jpg',
	'/src/assets/images/chris-stenger-e9k9i2JKnnA-unsplash.jpg',
	'/src/assets/images/eduard-dtuM342uTmc-unsplash.jpg',
	'/src/assets/images/henry-be-IicyiaPYGGI-unsplash.jpg',
	'/src/assets/images/qingbao-meng-01_igFr7hd4-unsplash.jpg',
	'/src/assets/images/tim-de-pauw-SBYsc1gsA-M-unsplash.jpg',
	'/src/assets/images/vincent-van-zalinge-vUNQaTtZeOo-unsplash.jpg',
	'/src/assets/images/wil-stewart-pHANr-CpbYM-unsplash.jpg',
];

function getPlaceholder() {
	const randomIndex = Math.floor(Math.random() * placeholderImages.length);
	return placeholderImages[randomIndex];
}

export default getPlaceholder;