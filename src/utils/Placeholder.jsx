import placeholder_12345 from '/src/assets/images/bart-zimny-W5XTTLpk1-I-unsplash.jpg';
import placeholder_23456 from '/src/assets/images/chris-stenger-e9k9i2JKnnA-unsplash.jpg';
import placeholder_34567 from '/src/assets/images/eduard-dtuM342uTmc-unsplash.jpg';
import placeholder_45678 from '/src/assets/images/henry-be-IicyiaPYGGI-unsplash.jpg';
import placeholder_56789 from '/src/assets/images/qingbao-meng-01_igFr7hd4-unsplash.jpg';
import placeholder_67890 from '/src/assets/images/tim-de-pauw-SBYsc1gsA-M-unsplash.jpg';
import placeholder_78901 from '/src/assets/images/vincent-van-zalinge-vUNQaTtZeOo-unsplash.jpg';
import placeholder_89012 from '/src/assets/images/wil-stewart-pHANr-CpbYM-unsplash.jpg';

const placeholderImages = [
	placeholder_12345,
	placeholder_23456,
	placeholder_34567,
	placeholder_45678,
	placeholder_56789,
	placeholder_67890,
	placeholder_78901,
	placeholder_89012,
];

function getPlaceholder() {
	const randomIndex = Math.floor(Math.random() * placeholderImages.length);
	return placeholderImages[randomIndex];
}

export default getPlaceholder;
