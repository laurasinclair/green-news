import { Container, Row, Col } from 'react-bootstrap';
import styles from './index.module.sass';
import classNames from 'classnames';
import placeholder from '@img/bart-zimny-W5XTTLpk1-I-unsplash.jpg';

export default function NotFound() {
	return (
		<main className={classNames(styles.notFound, 'main')}>
			<Container fluid>
				<Row>
					<Col className={classNames(styles.layout, 'mt-5', 'mb-4')}>
						<div className={classNames(styles.errorNumber, 'mb-4')}>&nbsp;</div>
						<p>Oops. Page not found.</p>
					</Col>
				</Row>
			</Container>
		</main>
	);
}
