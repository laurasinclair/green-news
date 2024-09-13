import { useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { Logo, Button, UserPicture } from '@components';
import { useUserContext } from '@context';
import placeholder from '@img/placeholder_1-1.jpg';
import styles from './index.module.sass';
import { paths } from 'router/paths';

export default function Navbar() {
	const { currentUser, handleLogIn } = useUserContext();

	return (
		<nav className={styles.navbar}>
			<Container fluid>
				<Row>
					<Col>
						<NavLink to={paths.base}>
							<Logo
								size='xs'
								hasText
							/>
						</NavLink>
					</Col>
					<Col className='d-flex align-items-center justify-content-end'>
						{currentUser &&
						currentUser.userInfo &&
						currentUser.isLoggedIn ? (
							<NavLink
								to='user/johndoe'
								className='d-flex align-items-center'>
								<div className={styles.navbar_welcome}>
									Welcome, {currentUser.userInfo.firstName}{' '}
									{currentUser.userInfo.lastName}
								</div>

								<UserPicture
									src={
										currentUser.userInfo.profilePicture || placeholder
									}
									alt={`${currentUser.userInfo.firstName} ${currentUser.userInfo.lastName}`}
									className='ms-4'
									size='50px'
								/>
							</NavLink>
						) : (
							<div>
								<Button
									type='primary-outline'
									label='Log in'
									onClick={handleLogIn}
									to='user/johndoe'
								/>
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</nav>
	);
}
