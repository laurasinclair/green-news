import { useEffect } from 'react';

import { Container } from 'react-bootstrap';
import classNames from 'classnames';

import { Feed } from '@components';
import styles from './index.module.sass';
import bgImage from '@img/bart-zimny-W5XTTLpk1-I-unsplash.jpg';
import logoImage from '@img/greennews_logo.svg';

export default function HomePage() {
	useEffect(() => {
		document.title = window.name + ' | ' + window.slogan;
	}, []);

	return (
		<div className={styles.homepage}>
			<Container
				fluid
				className={styles.homepage_top}
				style={{ backgroundImage: 'url(' + bgImage + ')' }}>
				<div className='px-5'>
					<img
						src={logoImage}
						alt={window.name + ' | ' + window.slogan}
						width={400}
					/>
					<p className={classNames(styles.homepage_top_slogan, 'mb-0')}>
						{window.slogan}
					</p>
				</div>
			</Container>

			<Feed />
		</div>
	);
}
