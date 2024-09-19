import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from '../Button/index.module.sass';

type Props = {
	to: string;
	label: string;
	type?:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'primary-outline'
		| 'secondary-outline'
		| 'tertiary-outline';
	fullWidth?: boolean;
	iconRight?: React.ReactNode;
	iconLeft?: React.ReactNode;
	onClick?: React.MouseEvent<HTMLButtonElement>;
	stretchedLink?: boolean;
	className?: string;
};

const LinkAsButton: React.FC<Props> = ({
	to,
	label,
	type = 'primary',
	fullWidth = false,
	iconRight,
	iconLeft,
	stretchedLink,
	className,
}: Props) => {
	const typeStyles = {
		primary: styles['btn-primary'],
		secondary: styles['btn-secondary'],
		tertiary: styles['btn-tertiary'],
		'primary-outline': styles['btn-primary-outline'],
		'secondary-outline': styles['btn-secondary-outline'],
		'tertiary-outline': styles['btn-tertiary-outline'],
	};

	const buttonTypeClass = typeStyles[type] || typeStyles.primary;

	const buttonClasses = classNames(
		{ 'stretched-link': stretchedLink },
		buttonTypeClass,
		{ [styles['full-width']]: fullWidth },
		{ [styles['icon-left']]: iconLeft },
		{ [styles['icon-right']]: iconRight }
	);

	return (
		<Link
			to={to}
			className={classNames(className, buttonClasses)}>
			{iconLeft}
			{label}
			{iconRight}
		</Link>
	);
};
export default LinkAsButton;
