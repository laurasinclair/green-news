import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.sass';
import { ArrowLeftShort } from 'react-bootstrap-icons';

import { paths } from 'router/paths';

type Props = {
	label: string;
};

export default function BackButton({ label = 'Back to previous page' }: Props) {
	return (
		<Link
			to={paths.base}
			className={styles.btn_back}>
			<ArrowLeftShort size={26} /> {label}
		</Link>
	);
}
