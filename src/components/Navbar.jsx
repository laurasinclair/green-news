import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
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
				</Row>
			</Container>
		</nav>
	)
}