import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'

import { Button, Hero, Feed } from '@components'

export default function HomePage() {
	return (
		<>
			<Container fluid>
				<Hero title="Green News" size="m" />
			</Container>

			<Container fluid>
				<Feed>I can even add content, here.</Feed>
			</Container>
		</>
	)
}
