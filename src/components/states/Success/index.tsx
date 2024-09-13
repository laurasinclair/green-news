import * as React from 'react';

import { Check } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './index.module.sass';

type SuccessProps = {
	children: React.ReactNode;
	className: string;
};

const Success: React.FC<SuccessProps> = ({ children, className }) => {
	return (
		<div className={classNames(styles.success, className)}>
			<Check size={32} />
			<p>{children}</p>
		</div>
	);
};

export default Success;
