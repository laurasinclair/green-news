import { fetchArticles } from 'api';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Article } from 'src/types';
import { getData } from 'src/utils';

interface FeedContextType {
	articles: Article[];
	setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
	totalArticles: number;
	setTotalArticles: React.Dispatch<React.SetStateAction<number>>;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const useFeedContext = () => {
	const context = useContext(FeedContext);
	return context;
};

const getArticles = async (): Promise<{articles: Article[], totalArticles: number} | void> => {
	try {
		const localStoredArticles = await getData("articles");
		if (localStoredArticles) {
			return localStoredArticles;
		}

		const fetchedArticles = await fetchArticles(1);
		if (!fetchedArticles) throw new Error(fetchedArticles);
		return fetchedArticles;
	} catch (error) {
		// console.warn("❌ getAllArticles()", error);
	}
};

const FeedContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [totalArticles, setTotalArticles] = useState<number>(0);

	const updateArticles = useCallback((articles: Article[], totalArticles: number) => {
		setArticles(articles);
		setTotalArticles(totalArticles);
	}, []);
	
	const initializeArticles = useCallback(async () => {
		try {
			const response = await getArticles();
			if (!response) throw new Error("Couldn't find articles");
			updateArticles(response.articles, response.totalArticles);
		} catch (error) {
			// console.error(
			// 	"❌ initializeArticles()",
			// 	error
			// );
		}
	}, []);
	
	useEffect(() => {
		initializeArticles();
	}, []);

	return (
		<FeedContext.Provider
			value={{ articles, setArticles, totalArticles, setTotalArticles }}>
			{children}
		</FeedContext.Provider>
	);
};

export default FeedContextProvider;
