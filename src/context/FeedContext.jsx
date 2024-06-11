import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const FeedContext = createContext({});
export const useFeedContext = () => useContext(FeedContext);

export default function FeedContextProvider({ children }) {
	// fetching the data
	const [data, setData] = useState([]);
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
					setData(resp.data.docs);
				})
				.catch((error) => {
					setError("Data couldn't be fetched");
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
			}}>
			{children}
		</FeedContext.Provider>
	);
}
