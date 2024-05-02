import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { PersonCircle } from 'react-bootstrap-icons'
import { Logo, Button } from '@components';
import placeholder from '@img/placeholder_1-1.jpg'
import styles from './styles/Navbar.module.sass'

export default function Navbar({currentUser}) {
	const [userImage, setUserImage] = useState(placeholder)

	useEffect(() => {
		currentUser.profilePicture && (
			setUserImage(currentUser.profilePicture)
		)
	}, [currentUser, currentUser.profilePicture])

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
							<>
							<NavLink to="/user/johndoe" className="d-flex align-items-center">
							{currentUser.firstName} {currentUser.lastName}
								<div className={styles.userPicture}>
									<img src={userImage} alt={`${currentUser.firstName} ${currentUser.lastName}`} />
								</div>
							</NavLink>
							</>
						) : (
						<NavLink to="/user/johndoe">
							<Button type="primary-outline" text="Log in" />
						</NavLink>
						)}
					</Col>
				</Row>
			</Container>
		</nav>
	)
}