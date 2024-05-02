import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { Button, Hero, Feed } from '@components'

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


	useEffect(() => {
		if (currentUser && currentUser.firstName) {
			document.title = `${window.name} | ${currentUser.firstName} ${currentUser.lastName} ⛭ User settings`
		}
	}, [currentUser])

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

								<h3>Saved articles</h3>

								{currentUser.savedArticles && currentUser.savedArticles.length < 1 ? (
									<Col md="6" lg="4" className="mb-4">
										Nothing to show today :(
									</Col>
								) : (
									currentUser.savedArticles.map((article) => {
										return (
											<Col md="6" lg="4" className="mb-4">
												{article}
											</Col>
										)
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
