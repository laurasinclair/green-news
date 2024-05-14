import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import placeholder from '@img/bart-zimny-W5XTTLpk1-I-unsplash.jpg'

import { BackButton, SaveBtn } from '@components'
import { useUserContext } from '@components/UserContext'
import { useFeedContext } from '@components/FeedContext'

import styles from './styles/Article.module.sass'

export default function Article() {
	const { data, setData, error, setError } = useFeedContext()
	const { currentUser } = useUserContext()
	const [loading, setLoading] = useState('')
	const navigate = useNavigate()

	// matching the url with the right article
	function getSlug(str) {
		if (!str) return
		if (typeof str === 'string') {
			const tempString = str
				.replaceAll(/[^a-zA-Z0-9]/g, '-')
				.toLowerCase()
				.substring(0, 50)
			return tempString.replace(/-+/g, '-').replace(/-$/, '')
		}
	}

	const [article, setArticle] = useState({})
	const articleUrl = useParams().articleSlug
	useEffect(() => {
		if (data) {
			const findArticle = data.find((article) => {
				return getSlug(article.headline.main) === articleUrl
			})

			if (findArticle) {
				setArticle(findArticle)
			}
			setError('')
			setLoading(false)
		} else {
			setError('No data to display')
		}
	}, [articleUrl, data, setError])

	useEffect(() => {
		if (article && article.headline && article.headline.main) {
			document.title = window.name + ' | ' + article.headline.main
		}
	console.log(article)

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
			<div className={styles.article_top} style={{ backgroundImage: 'url(' + ('http://static01.nyt.com/' + (article.multimedia && article.multimedia[0].url) || placeholder) + ')' }}>
				<Container fluid>
					<div className={styles.article_top_content}>
						<h3>{article && article.headline && article.headline.main}</h3>
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
										<strong>{article.byline ? article.byline.original : 'Author unknown'}</strong> {article.source && ('  -  ' + article.source)}<br />
										{article.publishedAt ? ('Published on ' + publishedDate(article.pub_date)) : 'Publication date unknown'}
									</p>
								</div>

								{article ? (
									<>
									<div className="pb-3 pb-md-5">
										<div className={styles.article_description}>{article.snippet}</div>
										<div className={styles.article_content}>{article.lead_paragraph}</div>
									</div>
									<p>
										<a href={article.web_url} target='_blank' rel='noreferrer'>Link to the full article</a>
									</p>
									</>
								) : (
									<div>
										No content to display at the moment.
									</div>
								)}

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
