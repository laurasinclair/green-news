import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Logo } from 'components';
import styles from './index.module.sass';
import classNames from 'classnames';
import { HeroType } from '../../../types';

export default function Hero({ size = 's', ...props }: HeroType) {
	const sizeClasses = {
		s: styles['hero-small'],
		m: styles['hero-medium'],
		l: styles['hero-large'],
	};

	const heroSizeClass = sizeClasses[size] || sizeClasses.m;

	return (
		<div
			className={classNames(
				'hero',
				styles.hero,
				heroSizeClass,
				props.className
			)}>
			<Container
				fluid
				className={styles.test}>
				<Row>
					<Col
						sm={9}
						lg={8}>
						{props.h3 ?? <h3 className={styles['mb-3']}>{props.h3}</h3>}
						{props.hasLogo && (
							<Logo
								size='s'
								hasText
							/>
						)}
						<h1 className={styles['mt-2']}>{props.title}</h1>
						{props.leadText && (
							<p className={classNames('leadText', styles.hero_slogan)}>
								{props.leadText}
							</p>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}
