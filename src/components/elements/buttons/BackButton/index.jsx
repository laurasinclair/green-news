import { Link } from 'react-router-dom'
import styles from './index.module.sass'
import { ArrowLeftShort } from 'react-bootstrap-icons'

export default function BackButton({label = 'Back to previous page'}) {

	return (
		<Link
			to='/'
			className={styles.btn_back}>
			<ArrowLeftShort size="26" /> {label}
		</Link>
	)
}
