import React from 'react';

import { Check } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './index.module.sass';

function Success({ children, className }) {
	return (
		<div className={classNames(styles.success, className)}>
			<Check size={32} />
			<p>
				{children}
			</p>
		</div>
	);
}

export default Success;
