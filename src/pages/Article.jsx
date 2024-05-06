import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { Button, Hero, SaveBtn } from '@components'
import { useUserContext } from '../components/UserContext'

export default function Article() {
	const { currentUser } = useUserContext();
	// const navigate = useNavigate()

	// fetching the data
	const [data, setData] = useState([])
	const [article, setArticle] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		fetch(`https://newsapi.org/v2/everything?q=trees&apiKey=${import.meta.env.VITE_NEWS_API_TOKEN}`)
			.then((resp) => resp.json())
			.then((data) => setData(data))
			.catch((err) => setError(`Data couldn't be fetched - ${err}`))
	}, [])

	// matching the url with the right article
	function getSlug(str) {
		const tempString = str
			.replaceAll(/[^a-zA-Z0-9]/g, '-')
			.toLowerCase()
			.substring(0, 50)
		return tempString.replace(/-+/g, '-').replace(/-$/, '')
	}

	const articleUrl = useParams().articleSlug
	useEffect(() => {
		if (data && data.articles) {
			const findArticle = data.articles.find((article) => {
				return getSlug(article.title) === articleUrl
			})

			if (findArticle) {
				setArticle(findArticle)
			}
			setError('')
			setLoading(false)
		} else {
			setError('No data to display')
		}
	}, [articleUrl, data])

	useEffect(() => {
		if (article && article.title) {
			document.title = window.name + ' | ' + article.title
		}
	}, [article])


	return (
		<>
			<Container fluid>
				<Hero title={article.title} size="m" />

				<Row>
				{loading ? (	
						<Col>
							<div>
								<p>
									Loading...
								</p>
							</div>
						</Col>
					) : ( error ? (
						<Col>
							<div>
								<p>
									{error}
								</p>
							</div>
						</Col>
					) : (
						article && (
							<>
								<Col md="6" lg="4" className="mb-4">
									<div>
										{currentUser.isLoggedIn && (
											<SaveBtn articleSlug={getSlug(article.title)} />
										)}

										<div>Author: {article.author}</div>
										<div>
											<a href={article.url}>{article.source.name}</a>
										</div>
										<img src={article.urlToImage} alt="" />
										<div>publishedAt: {article.publishedAt}</div>
										<div>description: {article.description}</div>
										<div>content: {article.content}</div>
									</div>
								</Col>
							</>
						)
					))}
				</Row>
			</Container>
		</>
	)
}
