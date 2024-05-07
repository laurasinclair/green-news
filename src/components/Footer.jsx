import { BoxArrowUpRight, Github, Linkedin } from 'react-bootstrap-icons'
import { Container, Row, Col } from 'react-bootstrap'
import styles from './styles/Footer.module.sass'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Container fluid>
				<Row className="justify-content-between flex-column flex-md-row">
					<Col md="10" className="d-flex align-items-center">
						<p className="text-center">
							Made with 🖤 (and a lot of coffee) by Laura Sinclair
						</p>
					</Col>
					<Col md="2" className="d-flex justify-content-center justify-content-md-end">
						<p>
							<a href="https://github.com/laurasinclair" target="_blank" rel="noreferrer" className="m-2">
								<Github size="30" color="#2B3B20" />
							</a>

							<a href="https://www.linkedin.com/in/laurasnclr/" target="_blank" rel="noreferrer" className="m-2">
								<Linkedin size="30" color="#2B3B20" />
							</a>
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}
