import { Link } from 'react-router-dom';
import styles from './index.module.sass';
import { ArrowLeftShort } from 'react-bootstrap-icons';

import { paths } from 'router/paths';

export default function BackButton({ label = 'Back to previous page' }) {
	return (
		<Link
			to={paths.base}
			className={styles.btn_back}>
			<ArrowLeftShort size='26' /> {label}
		</Link>
	);
}
