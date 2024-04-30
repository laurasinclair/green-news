import { Container, Col, Row } from 'react-bootstrap'
import { EmojiSmile, ArrowRightShort } from 'react-bootstrap-icons'
import { useState, useEffect } from 'react'

import Hero from '/src/components/Hero'
import Button from '/src/components/Button'

export default function HomePage() {
	const [data, setData] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		fetch('https://newsapi.org/v2/everything?q=trees&apiKey=7a472eb4344f4fd683c4c24f3bb3ffd5')
			.then((resp) => resp.json())
			.then((data) => setData(data.articles))
			.catch((err) => setError('Oops'))
	}, [])

	const test = {
		"id": 5,
		"description": "YEEEEEEEESSSSSSSSSS'",
		"userId": 5
	}

	function handleClick() {
		fetch('http://localhost:7200/projects/3', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			body: JSON.stringify(test),
		})
		.catch((err) => setError(`${err}`)) 
		.finally(() => setError(''))
	}

	return (
		<>
			<Hero title="Green News" size="m" />


			<Button className="btn-primary" text="click" onClick={handleClick}/>


			{error && (
				<div>
					OH NO. <br />
					{error}
				</div>
			)}

			<Container fluid>
				<Row>
					{data.map((e, i) => {
						return (
							<>
								<Col md="6" lg="4" key={`${e.title}+${i}`} className="article">
									<div>
										<h3>{e.title}</h3>
										<div>{e.description}</div>
									</div>
								</Col>
							</>
						)
					})}
				</Row>
			</Container>
		</>
	)
}
