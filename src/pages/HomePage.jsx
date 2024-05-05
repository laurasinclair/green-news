import { Container } from 'react-bootstrap'
import { Hero, Feed } from '@components'

export default function HomePage() {
	return (
		<>
			<Hero title="Green News" size="m" />

			<Feed />
		</>
	)
}
