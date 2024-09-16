import * as React from 'react';
import { createContext, useContext, useState } from 'react';

const FeedContext = createContext({});
export const useFeedContext = () => useContext(FeedContext);

const FeedContextProvider: React.FC<{children: React.ReactNode}> = ({
	children,
}) => {
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
};

export default FeedContextProvider;
