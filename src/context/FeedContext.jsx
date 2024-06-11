import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const FeedContext = createContext({});
export const useFeedContext = () => useContext(FeedContext);

export default function FeedContextProvider({ children }) {
	// fetching the data
	const [data, setData] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;

		const fetchData = () => {
			return new Promise((resolve, reject) => {
				axios
					.get('http://localhost:5005/api/articles?page=0' || `${import.meta.env.VITE_MONGODB_BASE_URL}/articles?page=0`)
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

		fetchData(); // Fetch data initially

		return () => {
            isMounted = false;
        };
	}, []);

	return (
		<FeedContext.Provider
			value={{
				data,
				setData,
				error,
				setError,
			}}>
			{children}
		</FeedContext.Provider>
	);
}
