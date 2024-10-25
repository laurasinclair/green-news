import * as React from 'react';
import { useEffect } from 'react';

import { Container } from 'react-bootstrap';
import classNames from 'classnames';

import { Feed } from 'components';
import styles from './index.module.sass';
import bgImage from 'images/bart-zimny-W5XTTLpk1-I-unsplash.jpg';
import { LogoSVG } from 'components/elements/Logo';

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
				<div className='px-5 d-flex flex-column align-items-center'>
					<LogoSVG
						width={440}
						color='white'
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
