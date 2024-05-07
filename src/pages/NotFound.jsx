import { Container, Row, Col } from 'react-bootstrap'
import styles from './styles/NotFound.module.sass'
import classNames from 'classnames'

export default function NotFound () {
	return (
		<main className={classNames(styles.notfound, 'main')}>	
			<Container fluid>
				<Row>
					<Col className={classNames(styles.layout, 'mt-5', 'px-0')}>
						<p>Oops. Page not found.</p>
						<div className={styles.errorNumber}>&nbsp;</div>
					</Col>
				</Row>
			</Container>
		</main>
	)
}
