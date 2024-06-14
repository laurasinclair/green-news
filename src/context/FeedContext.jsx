import { createContext, useContext, useEffect, useState } from 'react';

const FeedContext = createContext({});
export const useFeedContext = () => useContext(FeedContext);

export default function FeedContextProvider({ children }) {
	const [articles, setArticles] = useState([]);
	const [totalArticles, setTotalArticles] = useState(0);

	return (
		<FeedContext.Provider
			value={{
				articles,
				setArticles,
				totalArticles,
				setTotalArticles,
			}}>
			{children}
		</FeedContext.Provider>
	);
}
