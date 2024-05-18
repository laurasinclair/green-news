import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const FeedContext = createContext({})
export const useFeedContext = () => useContext(FeedContext)

export default function FeedContextProvider({ children }) {
	// fetching the data
	const [data, setData] = useState([])
	const [error, setError] = useState('')
	const [isDataFetched, setIsDataFetched] = useState(false)

	const fetchData = (data) => {
		return new Promise((resolve, reject) => {
		axios
			.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=nature&api-key=${import.meta.env.VITE_NYTIMES_API_TOKEN}`)
			.then((resp) => resolve({ data, ...resp }))
			.catch((error) => reject(error))
		})
	}

	useEffect(() => {
		if (!isDataFetched) {
			fetchData()
				.then((result) => {
					setData(result.data.response.docs)
					setIsDataFetched(true)
				})
				.catch((error) => {
					setError("Data couldn't be fetched")
					console.error("Data couldn't be fetched", error)
				})
		}
	}, [isDataFetched])

	return <FeedContext.Provider value={{ data, setData, error, setError }}>{children}</FeedContext.Provider>
}