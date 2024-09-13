import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Logo } from '@components';
import styles from './index.module.sass';
import classNames from 'classnames';
import { Logo as LogoInterface } from '../../../types';

export default function Hero({
	size = 100,
	title,
	h3,
	leadText,
	hasLogo,
	className,
}: LogoInterface) {
	const sizeClasses = {
		s: styles['hero-small'],
		m: styles['hero-medium'],
		l: styles['hero-large'],
	};

	const heroSizeClass = sizeClasses[size] || sizeClasses.m;

	return (
		<div
			className={classNames('hero', styles.hero, heroSizeClass, className)}>
			<Container
				fluid
				className={styles.test}>
				<Row>
					<Col
						sm={9}
						lg={8}>
						{h3 ?? <h3 className={styles['mb-3']}>{h3}</h3>}
						{hasLogo && (
							<Logo
								size='s'
								hasText
							/>
						)}
						<h1 className={styles['mt-2']}>{title}</h1>
						{leadText && (
							<p className={classNames('leadText', styles.hero_slogan)}>
								{leadText}
							</p>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}
