import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, HeartFill } from 'react-bootstrap-icons'

import { Button } from '@components'

export default function SaveBtn({articleSlug}) {
	const [userData, setUserData] = useState({})
	const [error, setError] = useState('')
    
	// saving article to user page
	const [saveButtonState, setSaveButtonState] = useState({
		saved: false,
		label: 'Save article',
		icon: <Heart />,
	})

    useEffect(() => {
        fetch('http://localhost:7200/users/1')
        .then((resp) => resp.json())
        .then((data) => setUserData(data))
        .catch((err) => 'Error fetching userData')
    }, [])

    useEffect(() => {
        if (userData && userData.savedArticles) {
            const index = userData.savedArticles.indexOf(articleSlug)

            if (index === -1) {
                setSaveButtonState({
                    saved: false,
                    label: 'Save article',
                    icon: <Heart />,
                })
            } else {
                setSaveButtonState({
                    saved: true,
                    label: 'Article saved!',
                    icon: <HeartFill />,
                })
            }
        }
    }, [userData, articleSlug])

	async function handleClick(e) {
		e.preventDefault()

		try {
			const userResponse = await fetch('http://localhost:7200/users/1')
			const user = await userResponse.json()
			const index = user.savedArticles.indexOf(articleSlug)

			if (index === -1) {
				user.savedArticles.push(articleSlug)
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
