import { createContext, useContext, useEffect, useState } from 'react';
import { fetchArticles } from '../api/Api';
import axios from 'axios';

const FeedContext = createContext({});
export const useFeedContext = () => useContext(FeedContext);

export default function FeedContextProvider({ children }) {
	const [articles, setArticles] = useState({});
	const [totalArticles, setTotalArticles] = useState(undefined);

	// const fetchData = async (page) => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${'http://localhost:5005'}/api/articles?page=${page | 0}`
	// 		);
	// 		return response.data;
	// 	} catch (error) {
	// 		console.log('❌ -', error.message);
	// 	}
	// };

	useEffect(() => {
		fetchArticles()
		.then((data) => {
			console.log(data)
			if (data.articles) {
				setArticles(data.articles)
			}
		})
		.catch((err) => console.log('There was an error fetching data'))
	}, [articles]);


	return (
		<FeedContext.Provider
			value={{
				articles,
				setArticles,
				// fetchData,
				totalArticles,
				setTotalArticles,
			}}>
			{children}
		</FeedContext.Provider>
	);
}
