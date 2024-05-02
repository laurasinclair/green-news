import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, HeartFill } from 'react-bootstrap-icons'

import { Button } from '@components'

export default function SaveBtn({article}) {
	const [error, setError] = useState('')
    
	// saving article to user page
	const [saveButtonState, setSaveButtonState] = useState({
		saved: false,
		label: 'Save article',
		icon: <Heart />,
	})

	async function handleClick(e) {
		e.preventDefault()

		try {
			const userResponse = await fetch('http://localhost:7200/users/1')
			const user = await userResponse.json()

			const index = user.savedArticles.indexOf(article)

			if (index === -1) {
				user.savedArticles.push(article)
				setSaveButtonState({
					saved: true,
					label: 'Article saved!',
					icon: <HeartFill />,
				})
			} else {
				user.savedArticles.splice(index, 1)
				setSaveButtonState({
					saved: false,
					label: 'Save article',
					icon: <Heart />,
				})
			}

			const updatedResponse = await fetch('http://localhost:7200/users/1', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			})
			console.log({
				'saved articles': user.savedArticles.length,
				index: index,
				saved: saveButtonState.saved,
				updatedResponse: updatedResponse.status,
			})
		} catch (error) {
			setError("Article couldn't be saved :(", error)
		}
	}

	return <Button onClick={handleClick} text={saveButtonState.label} iconRight={saveButtonState.icon} />
}
