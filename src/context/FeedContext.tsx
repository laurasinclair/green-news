import { createContext, useContext, useState } from 'react';
import { Article } from 'src/types';

interface FeedContextType {
	articles: Article[];
	setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
	totalArticles: number;
	setTotalArticles: React.Dispatch<React.SetStateAction<number>>;
}

// Create context with a default value of undefined
const FeedContext = createContext<FeedContextType | undefined>(undefined);

// Custom hook to use the FeedContext
export const useFeedContext = () => {
	const context = useContext(FeedContext);
	if (!context) {
		throw new Error(
			'useFeedContext must be used within a FeedContextProvider'
		);
	}
	return context;
};

// Provider component
const FeedContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [totalArticles, setTotalArticles] = useState<number>(0);

	return (
		<FeedContext.Provider
			value={{ articles, setArticles, totalArticles, setTotalArticles }}>
			{children}
		</FeedContext.Provider>
	);
};

export default FeedContextProvider;
