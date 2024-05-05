import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { Container, Row, Col } from 'react-bootstrap'
import styles from './styles/Footer.module.sass'

export default function Footer () {
	return (
		<footer className={styles.footer}>
			<Container fluid>
				<Row>
					<Col>
						<p>
							<a href="#" className="wavy" target="_blank"  rel="noreferrer">Repository link <BoxArrowUpRight size="15"/></a>
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}
