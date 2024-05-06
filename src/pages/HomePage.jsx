import { Hero, Feed } from '@components'
import { useEffect } from 'react'
import styles from './styles/HomePage.module.sass';

export default function HomePage() {
	useEffect(() => {
		document.title = window.name + ' | ' + window.slogan
	}, [])

	return (
		<div className={styles.homepage}>
			<Hero title="Green News" size="m" leadText={window.slogan} className="tropical" />

			<Feed />
		</div>
	)
}
