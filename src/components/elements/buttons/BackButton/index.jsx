import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.sass'
import { ArrowLeftShort } from 'react-bootstrap-icons'

export default function BackButton({label = 'Back to previous page'}) {
	const navigate = useNavigate()

	return (
		<Link
			onClick={() => {
				navigate(-1)
			}}
			className={styles.btn_back}>
			<ArrowLeftShort size="26" /> {label}
		</Link>
	)
}
