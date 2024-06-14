import { useState, useEffect } from 'react';

import axios from 'axios';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './index.module.sass';
import { useUserContext } from '@context';
import { Button } from '@components';

export default function SaveButton({ articleSlug, fullWidth, className }) {
	const { currentUser, setCurrentUser } = useUserContext();

	// saving article to user page
	const [saveButtonState, setSaveButtonState] = useState({
		saved: false,
		label: 'Save article',
		icon: <Heart />,
	});

	useEffect(() => {
		const savedArticles = currentUser.userInfo.savedArticles;
		const index = savedArticles.indexOf(articleSlug);
		if (index === -1) {
			setSaveButtonState({
				saved: false,
				label: 'Save article',
				icon: <Heart />,
			});
		} else {
			setSaveButtonState({
				saved: true,
				label: 'Article saved!',
				icon: <HeartFill />,
			});
		}
	}, [articleSlug, currentUser.userInfo.savedArticles]);

	async function handleClick(e) {
		e.preventDefault();

		// console.clear();
		console.log('Save button clicked', `Saved? ${saveButtonState.saved}`);

		const savedArticles = currentUser.userInfo.savedArticles;
		const index = savedArticles.indexOf(articleSlug);

		try {
			console.log(index, savedArticles, articleSlug)
			if (index === -1) {
				console.log('Article not saved yet');
				
				const req = {
					id: currentUser.id,
					userInfo: {
						...currentUser.userInfo,
						savedArticles: [...currentUser.userInfo.savedArticles, articleSlug],
					},
				};

				axios
					.put(
						`${
							'http://localhost:5005' || import.meta.env.VITE_BACKEND_BASE_URL
						}/users/johndoe01`,
						req
					)
					.then((res) => {
						console.log('response', res.data.userInfo.savedArticles)
						if (res.userInfo) {
							setCurrentUser({
								userInfo: {
									...res.userInfo,
								},
							});
						}
						console.log(`Article '${articleSlug}' successfully saved`);
					});
					setSaveButtonState({
						saved: true,
						label: 'Article saved!',
						icon: <HeartFill />,
					});

			} else {
				// 	user.userInfo.savedArticles.splice(index, 1)

				const test = currentUser.userInfo.savedArticles.slice(index, 1)
				console.log('remove article', test)

				const req = {
					id: currentUser.id,
					userInfo: {
						...currentUser.userInfo,
						savedArticles: [...test],
					},
				};

				axios
					.put(
						`${
							'http://localhost:5005' || import.meta.env.VITE_BACKEND_BASE_URL
						}/users/johndoe01`,
						req
					)
					.then((res) => {
						console.log('response', res.data.userInfo.savedArticles)
						if (res.userInfo) {
							setCurrentUser({
								userInfo: {
									...res.userInfo,
								},
							});
						}
						console.log(`Article '${articleSlug}' successfully saved`);
					});
					setSaveButtonState({
						saved: true,
						label: 'Article saved!',
						icon: <HeartFill />,
					});

				// const updatedSavedArticles = currentUser.userInfo.savedArticles.filter(
				// 	(article) => article !== articleSlug
				// );

				// // Update userInfo with the new savedArticles array
				// setCurrentUser({
				// 	...currentUser,
				// 	userInfo: {
				// 		...currentUser.userInfo,
				// 		savedArticles: updatedSavedArticles,
				// 	},
				// });

				setSaveButtonState({
					saved: false,
					label: 'Save article',
					icon: <Heart />,
				});
			}

			// const updatedResponse = await fetch(`${import.meta.env.BASE_URL}/users/johndoe01`, {
			// 	method: 'PUT',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		...user
			// 	}),
			// })
			// console.table({
			// 	'saved articles': user.userInfo.savedArticles.length,
			// 	index: index,
			// 	'saved?': saveButtonState.saved,
			// 	updatedResponse: updatedResponse.status,
			// })
		} catch (error) {
			console.log("Article couldn't be saved :(", error.message);
		}
	}

	return (
		<Button
			onClick={handleClick}
			label={saveButtonState.label}
			iconRight={saveButtonState.icon}
			type='tertiary'
			className={classNames([styles.btn_save], className)}
			{...(fullWidth && { fullWidth })}
		/>
	);
}
