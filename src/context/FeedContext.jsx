import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const FeedContext = createContext({})
export const useFeedContext = () => useContext(FeedContext)

export default function FeedContextProvider({ children }) {
	// fetching the data
	const [data, setData] = useState([])
	const [error, setError] = useState('')

	const fetchData = () => {
		axios
			.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=nature&api-key=${import.meta.env.VITE_NYTIMES_API_TOKEN}`)
			.then(({ data }) => {
				console.log(data.response.docs)
				setData(data.response.docs)
				localStorage.setItem('articles', JSON.stringify(data.response.docs));
			})
			.catch((error) => setError(error))
	}

	useEffect(() => {
		const storedData = localStorage.getItem('articles')
		if (storedData) {
			setData(JSON.parse(storedData))
		} else {
			fetchData();
		}
	}, [])

	return <FeedContext.Provider value={{ data, setData, error, setError }}>{children}</FeedContext.Provider>
}
