import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { Button, Hero, Feed, SaveBtn, UploadImage } from '@components'
import { useUserContext } from '../components/UserContext'

export default function UserPage() {
	const navigate = useNavigate()

	const { currentUser, setCurrentUser } = useUserContext()
	// const { currentUser, setCurrentUser } = useUserContext();

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	// just updating the page title to the user name
	useEffect(() => {
		if (currentUser && currentUser.firstName && currentUser.lastName) {
			setLoading(false)
			document.title = `${window.name} | ${currentUser.firstName} ${currentUser.lastName} ⛭ User settings`
		}
	}, [currentUser])

	// displaying saved articles
	const [allArticles, setAllArticles] = useState([])
	useEffect(() => {
		fetch(`https://newsapi.org/v2/everything?q=trees&apiKey=${import.meta.env.VITE_NEWS_API_TOKEN}`)
			.then((resp) => resp.json())
			.then((data) => setAllArticles(data.articles))
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

	// logging out user
	const handleLogOut = (e) => {
		e.preventDefault()
		navigate('/')
		setCurrentUser({})
	}

	return (
		<>
			<Row>
				{loading ? (
					<div>Loading...</div>
				) : !currentUser ? (
					error && (
						<Col>
							<div>
								OH NO. <br />
								{error}
							</div>
						</Col>
					)
				) : (
					currentUser && (
						<>
						<Container fluid>
							<Hero title={`Hello, ${currentUser.firstName} ${currentUser.lastName}!`} leadText="Happy to see you here! 🌿" size="m" />
						</Container>

						<section>
							<Container fluid>
								<h2>User settings</h2>

								<Row>
									<Col>
										Profile picture:
										<UploadImage />
									</Col>
								</Row>
							</Container>
						</section>

						<section>
							<Container fluid>
								<h2>Saved articles</h2>
								<p>
									{currentUser.savedArticles && currentUser.savedArticles.length} article{(currentUser.savedArticles.length > 1) ? 's' : ''} saved
								</p>

								<Row>
									{currentUser.savedArticles && currentUser.savedArticles.length < 1 ? (
										<Col md="6" lg="4" className="mb-4">
											Nothing to show today :(
										</Col>
									) : (
										allArticles.map((article, i) => {
											for (let articleSlug of currentUser.savedArticles) {
												if (articleSlug === getSlug(article.title)) {
													return (
														<Col md="6" lg="4" key={i} className="mb-4">
															<Link to={`articles/${getSlug(article.title)}`}>
																<div>
																	<h3>{article.title}</h3>
																	<div>{article.description}</div>
																	<SaveBtn articleSlug={getSlug(article.title)} />
																</div>
															</Link>
														</Col>
													)
												}
											}
										})
									)}
								</Row>
							</Container>
						</section>
						<section>
							<Container fluid>
								<Row>
									<Col>
										<Button text="Log out" type="primary-outline" fullWidth onClick={handleLogOut} />
									</Col>
								</Row>
							</Container>
						</section>
						</>
					)
				)}
			</Row>
		</>
	)
}
