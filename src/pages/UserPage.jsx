import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Hero, Section, UploadImage, ArticleCard } from '@components'
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

							<Section>
								<Container fluid>
									<h2>User settings</h2>

									<Row>
										<Col>
											<h4>Profile picture</h4>

											<UploadImage />
										</Col>
										<Col className="d-flex">
											<div>
												<h4>Username</h4>
												<p>{currentUser.username}</p>
											</div>

											<div>
												<h4>First name</h4>
												<p>{currentUser.firstName}</p>
											</div>

											<div>
												<h4>Last name</h4>
												<p>{currentUser.lastName}</p>
											</div>
										</Col>
									</Row>
								</Container>
							</Section>

							<Section>
								<Container fluid>
									<h2>Saved articles</h2>
									<p>
										{currentUser.savedArticles && currentUser.savedArticles.length} article{currentUser.savedArticles.length > 1 ? 's' : ''} saved
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
																	<ArticleCard article={article} />
																</Link>
															</Col>
														)
													}
												}
											})
										)}
									</Row>
								</Container>
							</Section>
							<Section>
								<Container fluid>
									<Row>
										<Col>
											<Button text="Log out" type="primary-outline" fullWidth onClick={handleLogOut} />
										</Col>
									</Row>
								</Container>
							</Section>
						</>
					)
				)}
			</Row>
		</>
	)
}
