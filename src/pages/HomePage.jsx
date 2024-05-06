import { Hero, Feed } from '@components'
import styles from './styles/HomePage.module.sass';

export default function HomePage() {
	return (
		<div className={styles.homepage}>
			<Hero title="Green News" size="m" className="tropical" />

			<Feed />
		</div>
	)
}
