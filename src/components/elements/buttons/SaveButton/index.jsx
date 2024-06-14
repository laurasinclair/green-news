import { useState, useEffect } from 'react';

import axios from 'axios';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './index.module.sass';
import { useUserContext } from '@context';
import { Button } from '@components';

export default function SaveButton({ articleId, fullWidth, className }) {
	const { currentUser, setCurrentUser } = useUserContext();

	// saving article to user page
	const [saveButtonState, setSaveButtonState] = useState({
		saved: false,
		label: 'Save article',
		icon: <Heart />,
	});

	useEffect(() => {
		const savedArticles = currentUser.userInfo.savedArticles;
		const index = savedArticles.indexOf(articleId);

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
	}, [articleId, currentUser.userInfo.savedArticles]);

	async function handleClick(e) {
		e.preventDefault();

		const savedArticles = currentUser.userInfo.savedArticles;
		const index = savedArticles.indexOf(articleId);

		const req = {
			userId: currentUser.id,
			articleId: articleId,
			action: index === -1 ? 'add' : 'remove',
		};

		try {
			axios
				.put(
					`${
						'http://localhost:5005' || import.meta.env.VITE_BACKEND_BASE_URL
					}/users/johndoe01/savedarticles`,
					req
				)
				.then((res) => {
					if (res.status === 200) {
						setCurrentUser((prevState) => ({
							...prevState,
							userInfo: {
								...prevState.userInfo,
								savedArticles: res.data.savedArticles,
							},
						}));
					}
				});
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
