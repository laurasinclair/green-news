import { useState, useEffect } from 'react'

import axios from 'axios'
import { Heart, HeartFill } from 'react-bootstrap-icons'
import classNames from 'classnames';

import styles from './index.module.sass';
import { useUserContext } from '@context'
import { Button } from '@components'

export default function SaveButton({articleSlug, fullWidth, className}) {
	const { currentUser } = useUserContext()
    
	// saving article to user page
	const [saveButtonState, setSaveButtonState] = useState({
		saved: false,
		label: 'Save article',
		icon: <Heart />,
	})

    useEffect(() => {
        if (currentUser && currentUser.userInfo.savedArticles) {
            const index = currentUser.userInfo.savedArticles.indexOf(articleSlug)

            if (index === -1) {
				axios.put(`${import.meta.env.VITE_MONGODB_BASE_URL}/users/johndoe01`)//, req)
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
			const userResponse = await fetch(`${import.meta.env.BASE_URL}/users/johndoe01`)
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

			const updatedResponse = await fetch(`${import.meta.env.BASE_URL}/users/johndoe01`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...user
				}),
			})
			console.table({
				'saved articles': user.userInfo.savedArticles.length,
				index: index,
				'saved?': saveButtonState.saved,
				updatedResponse: updatedResponse.status,
			})
		} catch (error) {
			console.log("Article couldn't be saved :(", error)
		}
	}

	return <Button onClick={handleClick} label={saveButtonState.label} iconRight={saveButtonState.icon} type="tertiary" className={classNames([styles.btn_save], className)} {...(fullWidth && { fullWidth })} />
}
