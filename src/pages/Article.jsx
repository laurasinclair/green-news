import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import placeholder from '@img/bart-zimny-W5XTTLpk1-I-unsplash.jpg'

import { BackButton, SaveBtn } from '@components'
import { useUserContext } from '../components/UserContext'
import styles from './styles/Article.module.sass'

export default function Article() {
	const { currentUser } = useUserContext()
	const navigate = useNavigate()

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
		if (typeof str === 'string') {
			const tempString = str
				.replaceAll(/[^a-zA-Z0-9]/g, '-')
				.toLowerCase()
				.substring(0, 50)
			return tempString.replace(/-+/g, '-').replace(/-$/, '')
		}
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

	const publishedDate = (d) => {
		const date = new Date(d)

		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'UTC',
			hour12: false,
		}

		return date.toLocaleString('en-GB', options)
	}

	return (
		<>
			<div className={styles.article_top} style={{ backgroundImage: 'url(' + (article.urlToImage || placeholder) + ')' }}>
				<Container fluid>
					<div className={styles.article_top_content}>
						<h3>{article.title}</h3>
					</div>
				</Container>
			</div>

			<Container fluid>
				<Row>
					{loading ? (
						<Col>
							<div>
								<p>Loading...</p>
							</div>
						</Col>
					) : error ? (
						<Col>
							<div>
								<p>{error}</p>
							</div>
						</Col>
					) : (
						article && (
							<Col sm="10" md="8" lg="6" className="mx-auto pt-5 pb-3">
								<div>
									<p className={styles.article_details}>
										<strong>{article.author ? article.author : 'Author unknown :('}</strong> {article.source && article.source.name && ('  -  ' + article.source.name)}<br />
										Published on {article.publishedAt && (publishedDate(article.publishedAt))}
									</p>
								</div>

								<div className="pb-3 pb-md-5">
									<div className={styles.article_description}>{article.description}</div>
									<div className={styles.article_content}>{article.content}</div>
								</div>

								{currentUser.isLoggedIn && <SaveBtn articleSlug={getSlug(article.title)} />}

								<div className="pt-5">
									<BackButton label="Back to all articles" />
								</div>
							</Col>
						)
					)}
				</Row>
			</Container>
		</>
	)
}
