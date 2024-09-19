import * as React from 'react';
import classnames from 'classnames';
import styles from './index.module.sass';

type Props = {
	children?: React.ReactNode;
	className?: string;
};

export default function Main({ children, className }: Props) {
	return (
		<main className={classnames(styles.main, className)}>{children}</main>
	);
}
