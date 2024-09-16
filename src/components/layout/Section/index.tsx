import * as React from 'react';
import classNames from 'classnames';
import styles from './index.module.sass';

type SectionProps = {
	children: React.ReactNode;
	size?: 'xs' | 's' | 'm' | 'l';
};

const Section: React.FC<SectionProps> = ({
	children,
	size = 's',
}: SectionProps) => {
	const sizeClasses = {
		xs: styles['section-extrasmall'],
		s: styles['section-small'],
		m: styles['section-medium'],
		l: styles['section-large'],
	};

	const sectionContainerClass = classNames(styles.section, sizeClasses[size]);

	return <section className={sectionContainerClass}>{children}</section>;
};
export default Section;
