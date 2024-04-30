import { Container, Col, Row } from 'react-bootstrap'
import { EmojiSmile, ArrowRightShort } from 'react-bootstrap-icons'
import { useState, useEffect } from 'react'

import Hero from '/src/components/Hero'
import Button from '/src/components/Button'

export default function HomePage() {
	const [data, setData] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		fetch(`https://newsapi.org/v2/everything?q=trees&apiKey=${import.meta.env.VITE_NEWS_API_TOKEN}`)
			.then((resp) => resp.json())
			.then((data) => setData(data))
			.catch((err) => setError('Data couldn\'t be fetched'))
	}, [])

	useEffect(() => {
		if (!data) {
			setError('No data to display.')
		}
	}, [data])

	return (
		<>
			<Hero title="Green News" size="m" />

		

			<Container fluid>
				<Row>
					{console.log(data)}
					<h2>News feed</h2>

					{!data || data.length < 1 ?
						(
							error && (
								<div>
									OH NO. <br />
									{error}
								</div>
							)
						) : (
						data.articles.map((e, i) => {
							return (
								<>
									<Col md="6" lg="4" key={`${e.title}+${i}`} className="article">
										<div>
											<h3>{e.title}</h3>
											<div>{e.description}</div>
										</div>
									</Col>
								</>
							)
						})
					)}
				</Row>
			</Container>
		</>
	)
}
