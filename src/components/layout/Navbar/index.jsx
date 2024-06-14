import { useEffect } from 'react'

import { NavLink } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import { Logo, Button, UserPicture } from '@components'
import { useUserContext } from '@context'
import placeholder from '@img/placeholder_1-1.jpg'
import styles from './index.module.sass'

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
									<div className="d-none d-sm-inline">Welcome, {currentUser.userInfo.firstName} {currentUser.userInfo.lastName}</div>
									
									<UserPicture src={currentUser.userInfo.profilePicture || placeholder} alt={`${currentUser.userInfo.firstName} ${currentUser.userInfo.lastName}`} className="ms-4" size="50px" />
								</NavLink>
							) : (
								<Button type="primary-outline" label="Log in" onClick={handleLogin} to="/user/johndoe" />
							)
						) : (
							<div>
								<Button type="primary-outline" label="Log in" onClick={handleLogin} to="/user/johndoe" />
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</nav>
	)
}