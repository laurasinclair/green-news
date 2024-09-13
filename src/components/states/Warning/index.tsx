import * as React from 'react';

import { ExclamationCircle } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './index.module.sass';

type WarningProps = {
	children: React.ReactNode;
	className: string;
};

const Warning: React.FC<WarningProps> = ({ children, className }) => {
	return (
		<div className={classNames(styles.warning, className)}>
			<ExclamationCircle size={24} />
			<p>{children}</p>
		</div>
	);
};

export default Warning;
