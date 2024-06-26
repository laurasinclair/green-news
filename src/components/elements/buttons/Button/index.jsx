import { Link } from 'react-router-dom';

import classNames from 'classnames';

import styles from './index.module.sass';

export default function Button({
	to,
	label,
	type = 'primary',
	fullWidth = false,
	iconRight,
	iconLeft,
	onClick,
	stretchedLink,
	className,
}) {
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
			className={classNames(className, buttonClasses)}
			onClick={onClick}>
			{iconLeft}
			{label}
			{iconRight}
		</Link>
	);
}
