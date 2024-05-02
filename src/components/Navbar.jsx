import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { PersonCircle } from 'react-bootstrap-icons'
import { Logo } from '@components';
import styles from './styles/Navbar.module.sass'

export default function Navbar() {
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
						<NavLink to="/user/johndoe">
							<PersonCircle size="30" />
						</NavLink>
					</Col>
				</Row>
			</Container>
		</nav>
	)
}