import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Logo, Button, UserPicture } from '@components'
import placeholder from '@img/placeholder_1-1.jpg'
import styles from './styles/Navbar.module.sass'
import { useUserContext } from './UserContext'

export default function Navbar() {
	const { currentUser, setCurrentUser } = useUserContext()

	useEffect(() => {
		currentUser.isLoggedIn ? 
		console.info("%c👤 User successfully logged in!", "color: #2B3B20; padding: 6px 8px; background-color: #6FBF6B; display: inline-block; border-radius: 4px;") : 
		console.info("%c👤 User not logged in", "color: #FFDAD6; padding: 6px 8px; background-color: #4F3534; display: inline-block; border-radius: 4px;")
	}, [currentUser, currentUser.isLoggedIn])

	const handleLogin = (e) => {
		e.preventDefault()
		
		console.clear()

		currentUser && Object.keys(currentUser.userInfo).length !== 0 ? (
			setCurrentUser({
				...currentUser,
				"isLoggedIn": true
			})
		) : (
			console.error("%c👤 Can't find user", "color: #FFDAD6; padding: 6px 8px; background-color: #4F3534; display: inline-block; border-radius: 4px;")
		)

		
		// console.clear()
		// console.table('currentUser', currentUser)

		console.log(
			currentUser.isLoggedIn ? 
			console.info("%c👤 User successfully logged in!", "color: #2B3B20; padding: 6px 8px; background-color: #6FBF6B; display: inline-block; border-radius: 4px;") : 
			console.error("%c👤 User not logged in :(", "color: #FFDAD6; padding: 6px 8px; background-color: #4F3534; display: inline-block; border-radius: 4px;")
		)
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
						{currentUser && currentUser.isLoggedIn ? (
							Object.keys(currentUser.userInfo).length !== 0 ? (
								<NavLink to="/user/johndoe" className="d-flex align-items-center">
									Welcome, {currentUser.userInfo.firstName} {currentUser.userInfo.lastName}
									
									<UserPicture src={currentUser.userInfo.profilePicture || placeholder} alt={`${currentUser.userInfo.firstName} ${currentUser.userInfo.lastName}`} className="ms-4" size="50px" />
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
