import { Container, Row, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'
import styles from './styles/Feed.module.sass'

export default function Feed(props) {
	const [data, setData] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		fetch(`https://newsapi.org/v2/everything?q=trees&apiKey=${import.meta.env.VITE_NEWS_API_TOKEN}`)
			.then((resp) => resp.json())
			.then((data) => setData(data))
			.catch((err) => setError("Data couldn't be fetched"))
	}, [])

	useEffect(() => {
		if (!data) {
			setError('No data to display.')
		}
	}, [data])

	return (
		<>
			<h2>News feed</h2>
			<Row>
				{!data || data.length < 1
					? error && (
							<Col>
								<div>
									OH NO. <br />
									{error}
								</div>
							</Col>
					  )
					: data.articles.map((e, i) => {
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
					  })}
			</Row>

			{props.children}
		</>
	)
}
