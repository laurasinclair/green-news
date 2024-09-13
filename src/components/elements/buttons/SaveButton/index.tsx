import * as React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './index.module.sass';
import { useUserContext } from 'context';
import { Button } from 'components';
import { getSlug } from 'utils';
import { LoaderIcon } from 'components/states/Loading';

const serverURL = import.meta.env.VITE_BACKEND_BASE_URL;

export default function SaveButton({
	articleId,
	articleTitle,
	fullWidth,
	className,
}) {
	const { currentUser, setCurrentUser } = useUserContext();
	const savedArticles = currentUser?.userInfo?.savedArticles;
	const [isSaved, setIsSaved] = useState(undefined);

	// saving article to user page
	const [saveButtonState, setSaveButtonState] = useState({
		saved: false,
		label: 'Save article',
		icon: <Heart />,
	});

	useEffect(() => {
		if (savedArticles) {
			setIsSaved(
				savedArticles.some((article) => article.articleId === articleId)
			);
		}
	}, [articleId, savedArticles, currentUser]);

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

		setSaveButtonState((prev) => ({
			...prev,
			icon: (
				<LoaderIcon
					size='30'
					color='#fff'
				/>
			),
		}));

		const req = {
			userId: currentUser.id,
			articleId: articleId,
			articleTitle: articleTitle,
			articleSlug: getSlug(articleTitle),
			action: !isSaved ? 'add' : 'remove',
		};

		try {
			const response = await axios.put(
				`${serverURL}/users/${currentUser.username}/savedarticles`,
				req
			);

			if (response.status < 200 || response.status >= 300) {
				throw new Error('There was a problem fetching articles');
			}

			const updateSavedArticles = response.data;
			setCurrentUser((prevState) => ({
				...prevState,
				userInfo: {
					...prevState.userInfo,
					savedArticles: updateSavedArticles.savedArticles,
				},
			}));
		} catch (error) {
			console.error("Article couldn't be saved :(", error.message);
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
