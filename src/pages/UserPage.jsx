import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { Button, Hero, Feed, SaveBtn, UploadImage } from '@components'

export default function UserPage() {
	const navigate = useNavigate()

	// fetching the users
	const [users, setUsers] = useState([])
	const [currentUser, setCurrentUser] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		fetch(`http://localhost:7200/users/`)
			.then((resp) => resp.json())
			.then((data) => setUsers(data))
			.catch((err) => setError(`User couldn't be fetched - ${err}`))
	}, [])

	useEffect(() => {
		if (users && users[0]) {
			setCurrentUser(users[0])
			setLoading(false)
		} else {
			setError('No users to display')
		}
	}, [users, currentUser])

	// updating page title to user name
	useEffect(() => {
		if (currentUser && currentUser.firstName) {
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

	return (
		<>
			<Container fluid>
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
								<Col>
									<Hero title={`Hello ${currentUser.firstName} ${currentUser.lastName}`} size="m" />
								</Col>

								<h3>User settings</h3>
								<Row>
									<Col>
									Profile picture: 
									<UploadImage />
									</Col>
								</Row>

								<h3>Saved articles</h3>


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
							</>
						)
					)}
				</Row>
			</Container>
		</>
	)
}
