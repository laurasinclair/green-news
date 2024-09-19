import * as React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';
import { Heart, HeartFill, Icon } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './index.module.sass';
import { useUserContext } from 'context';
import { Button } from 'components';
import { getSlug } from 'utils';
import { LoaderIcon } from 'components/states/Loading';
import { Article, User } from 'src/types';

const serverURL = import.meta.env.VITE_BACKEND_BASE_URL;

type Props = {
	articleId: string;
	articleTitle: string;
	fullWidth?: boolean;
	className?: string;
};

type SaveButtonStateType = {
	saved: boolean;
	label: string;
	icon: React.ReactNode;
};

export default function SaveButton({
	articleId,
	articleTitle,
	fullWidth,
	className,
}: Props) {
	const { currentUser, setCurrentUser } = useUserContext();
	const savedArticles: Article[] = currentUser.userInfo.savedArticles;
	const [isSaved, setIsSaved] = useState<boolean | null>(null);

	const [saveButtonState, setSaveButtonState] = useState<SaveButtonStateType>({
		saved: false,
		label: 'Save article',
		icon: <Heart />,
	});

	useEffect(() => {
		if (!!savedArticles.length) {
			setIsSaved(() =>
				savedArticles.some((article: Article) => article._id === articleId)
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

	async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		setSaveButtonState((prev: SaveButtonStateType) => ({
			...prev,
			icon: (
				<LoaderIcon
					size={30}
					color='#fff'
				/>
			),
		}));

		const req = {
			userId: currentUser._id,
			articleId: articleId,
			articleTitle: articleTitle,
			articleSlug: getSlug(articleTitle),
			action: !isSaved ? 'add' : 'remove',
		};

		try {
			const response = await axios.put(
				`${serverURL}/users/${currentUser.userInfo.username}/savedarticles`,
				req
			);

			if (response.status !== 200) {
				throw new Error('There was a problem fetching articles');
			}

			const updateSavedArticles = response.data;

			setCurrentUser((prev: User) => ({
				...prev,
				userInfo: {
					...prev.userInfo,
					savedArticles: updateSavedArticles.savedArticles,
				},
			}));
		} catch (error: Error | unknown) {
			error instanceof Error
				? console.error(error.message)
				: console.error('An unexpected error occurred', error);
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
