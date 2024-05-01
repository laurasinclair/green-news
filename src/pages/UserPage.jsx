import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { Button, Hero, Feed } from '@components'

export default function UserPage() {
	// const navigate = useNavigate()

	// fetching the data
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		fetch(`https://newsapi.org/v2/everything?q=trees&apiKey=${import.meta.env.VITE_NEWS_API_TOKEN}`)
			.then((resp) => resp.json())
			.then((data) => setData(data))
			.catch((err) => setError(`Data couldn't be fetched - ${err}`))
	}, [])


	

	return (
		<>
			<Container fluid>
				<Hero title="Hello" size="m" />
				
				<Row>
				
				</Row>
			</Container>
		</>
	)
}
