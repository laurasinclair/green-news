import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect,} from 'react'
import { UserContext, Logo, Button, UserPicture } from '@components'
import placeholder from '@img/placeholder_1-1.jpg'
import styles from './styles/Navbar.module.sass'
import { useUserContext } from './UserContext'

export default function Navbar() {
	// const { currentUser, setCurrentUser } = useUserContext()
	const { currentUser, setCurrentUser } = useUserContext()

	// fetching the users
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const handleLogin = (e) => {
		e.preventDefault()

		fetch(`http://localhost:7200/users/1`)
			.then((resp) => resp.json())
			.then((data) => setCurrentUser(data))
			.catch((err) => setError(`User couldn't be fetched - ${err}`))
	}

	return (
		<nav className={styles.navbar}>
			<Container fluid>
				<Row>
					<Col>
						<NavLink to="/">
							<Logo size="xs" hasText />
						</NavLink>
					</Col>
					<Col className="d-flex align-items-center justify-content-end">
						{currentUser ? (
							Object.keys(currentUser).length !== 0 ? (
								<NavLink to="/user/johndoe" className="d-flex align-items-center">
									Welcome, {currentUser.firstName} {currentUser.lastName}
									
									<UserPicture src={currentUser.profilePicture || placeholder} alt={`${currentUser.firstName} ${currentUser.lastName}`} className="ms-4" size="50px" />
									
									{/* <img src={currentUser.profilePicture || placeholder} alt={`${currentUser.firstName} ${currentUser.lastName}`} /> */}
								</NavLink>
							) : (
								<NavLink to="/user/johndoe">
									<Button type="primary-outline" text="Log in" onClick={handleLogin} />
								</NavLink>
							)
						) : (
							<div>
								<NavLink to="/user/johndoe">
									<Button type="primary-outline" text="Log in" onClick={handleLogin} />
								</NavLink>
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</nav>
	)
}
