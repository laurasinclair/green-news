import { useState, useEffect } from 'react';

import axios from 'axios';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './index.module.sass';
import { useUserContext } from '@context';
import { Button } from '@components';
import { getSlug } from '@utils';

export default function SaveButton({
	articleId,
	articleTitle,
	fullWidth,
	className,
}) {
	const { currentUser, setCurrentUser } = useUserContext();
	const savedArticles = currentUser.userInfo.savedArticles;
	const [isSaved, setIsSaved] = useState(undefined);

	// saving article to user page
	const [saveButtonState, setSaveButtonState] = useState({
		saved: false,
		label: 'Save article',
		icon: <Heart />,
	});

	useEffect(() => {
		setIsSaved(
			savedArticles.some((article) => article.articleId === articleId)
		);
	}, [currentUser]);

	useEffect(() => {
		if (isSaved) {
			setSaveButtonState({
				saved: true,
				label: 'Article saved!',
				icon: <HeartFill />,
			});
		} else {
			setSaveButtonState({
				saved: false,
				label: 'Save article',
				icon: <Heart />,
			});
		}
	}, [isSaved, currentUser]);

	async function handleClick(e) {
		e.preventDefault();

		const req = {
			userId: currentUser.id,
			articleId: articleId,
			articleTitle: articleTitle,
			articleSlug: getSlug(articleTitle),
			action: !isSaved ? 'add' : 'remove',
		};

		try {
			axios
				.put(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/users/${
						currentUser.username
					}/savedarticles`,
					req
				)
				.then((res) => {
					if (res.status === 200) {
						console.log(res.data.message);

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
