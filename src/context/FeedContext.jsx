import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const FeedContext = createContext({});
export const useFeedContext = () => useContext(FeedContext);

export default function FeedContextProvider({ children }) {
	// fetching the data
	const [data, setData] = useState([]);
	const [totalArticles, setTotalArticles] = useState(undefined);
	const [error, setError] = useState('');

	const fetchData = (page) => {
		return new Promise((resolve, reject) => {
			axios
				.get(
					`${
						'http://localhost:5005' || import.meta.env.VITE_MONGODB_BASE_URL
					}/api/articles?page=${page || 0}`
				)
				.then((resp) => {
					const { articles, totalArticles } = resp.data;
					setData(articles);
					setTotalArticles(totalArticles)
				})
				.catch((error) => {
					console.error("Data couldn't be fetched", error);
					reject(error);
				});
		});
	};

	return (
		<FeedContext.Provider
			value={{
				data,
				setData,
				error,
				setError,
				fetchData,
				totalArticles
			}}>
			{children}
		</FeedContext.Provider>
	);
}
