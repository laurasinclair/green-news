import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles/BackButton.module.sass'
import { ArrowLeftShort } from 'react-bootstrap-icons'

export default function BackButton({label = 'Back to previous page'}) {
	const navigate = useNavigate()

	return (
		<Link
			onClick={() => {
				navigate(-1)
			}}
			className={styles.backbutton}>
			<ArrowLeftShort size="26" /> {label}
		</Link>
	)
}
