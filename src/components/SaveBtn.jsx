import { useState, useEffect } from 'react'
import { Heart, HeartFill } from 'react-bootstrap-icons'
import { useUserContext } from '@context'

import { Button } from '@components'

export default function SaveBtn({articleSlug, fullWidth}) {
	const { currentUser } = useUserContext()
	const [error, setError] = useState('')
    

	// saving article to user page
	const [saveButtonState, setSaveButtonState] = useState({
		saved: false,
		label: 'Save article',
		icon: <Heart />,
	})

    // useEffect(() => {
    //     fetch('http://localhost:7200/users/1')
    //     .then((resp) => resp.json())
    //     .then((data) => setcurrentUser(data))
    //     .catch((err) => 'Error fetching currentUser')
    // }, [])

    useEffect(() => {
        if (currentUser && currentUser.userInfo.savedArticles) {
            const index = currentUser.userInfo.savedArticles.indexOf(articleSlug)

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
    }, [currentUser, articleSlug])

	async function handleClick(e) {
		e.preventDefault()

		try {
			const userResponse = await fetch('http://localhost:7200/users/1')
			const user = await userResponse.json()
			const index = user.userInfo.savedArticles.indexOf(articleSlug)

			if (index === -1) {
				user.userInfo.savedArticles.push(articleSlug)
				setSaveButtonState({
					saved: true,
					label: 'Article saved!',
					icon: <HeartFill />,
				})
			} else {
				user.userInfo.savedArticles.splice(index, 1)
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
			console.table({
				'saved articles': user.userInfo.savedArticles.length,
				index: index,
				'saved?': saveButtonState.saved,
				updatedResponse: updatedResponse.status,
			})
		} catch (error) {
			setError("Article couldn't be saved :(", error)
		}
	}

	return <Button onClick={handleClick} label={saveButtonState.label} iconRight={saveButtonState.icon} type="tertiary" {...(fullWidth && { fullWidth })} />
}
