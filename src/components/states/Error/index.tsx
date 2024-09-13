import * as React from 'react';

import { X } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './index.module.sass';

type ErrorProps = {
	children: React.ReactNode;
	className: string;
};

const Error: React.FC<ErrorProps> = ({ children, className }) => {
	return (
		<div className={classNames(styles.error, className)}>
			<X size={32} />
			<p>{children}</p>
		</div>
	);
};

export default Error;
