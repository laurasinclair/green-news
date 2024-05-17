import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const FeedContext = createContext({})
export const useFeedContext = () => useContext(FeedContext)

export default function FeedContextProvider({ children }) {
	// fetching the data
	const [data, setData] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchData = (data) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					axios
						.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=nature&api-key=${import.meta.env.VITE_NYTIMES_API_TOKEN}`)
						.then((resp) => resolve({ data, ...resp }))
						.catch((error) => reject(error))
				}, 12000)
			})
		}

		fetchData()
			.then((result) => {
				setData(result.data.response.docs)
			})
			.catch((error) => {
				setError("Data couldn't be fetched")
				console.error("Data couldn't be fetched", error)
			})
	}, [])

	// fetch(`BROKENLINK}`)
	// fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=nature&api-key=${import.meta.env.VITE_NYTIMES_API_TOKEN}`)
	// 	.then((resp) => resp.json())
	// 	.then((data) => setData(data.response.docs))
	// 	.catch((err) => {
	// 		setError('Data couldn\'t be fetched')
	// 		console.error('Data couldn\'t be fetched', err)
	// 	})
	// }, [])

	return <FeedContext.Provider value={{ data, setData, error, setError }}>{children}</FeedContext.Provider>
}
