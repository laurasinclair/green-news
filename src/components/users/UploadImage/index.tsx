import * as React from 'react';
import { useState, useEffect } from 'react';

import { Row, Col } from 'react-bootstrap';

import { Button, UserPicture } from 'components';
import { useUserContext } from 'context';
import placeholder from 'images/placeholder_1-1.jpg';
import styles from './index.module.sass';
import { User } from 'src/types';

const serverURL = import.meta.env.VITE_BACKEND_BASE_URL;

type Props = {
	imageSize?: number;
};

const UploadImage = ({ imageSize }: Props) => {
	const { currentUser, setCurrentUser } = useUserContext();

	const [userImage, setUserImage] = useState({
		imageUrl: placeholder,
		label: 'Upload profile picture',
	});
	const [error, setError] = useState<ErrorState>('');

	// convert image file to Base64 string
	const convertToBase64 = (
		file: File
	): Promise<string | ArrayBuffer | null> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				resolve(reader.result);
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	// Handle file change event
	const handleFileChange = async (
		e: React.FormEvent<HTMLLabelElement> | React.FormEvent<HTMLInputElement>
	) => {
		const target = e.target as HTMLInputElement;
		let file: File | undefined;

		if (target.files && target.files.length > 0) {
			file = target.files[0];
		}

		if (!file) {
			return console.error('Problem with file');
		}

		const base64 = await convertToBase64(file);

		try {
			setCurrentUser((prev: User) => ({
				...prev,
				userInfo: {
					...prev.userInfo,
					profilePicture: base64?.toString(),
				},
			}));

			await fetch(`${serverURL}/users/johndoe01`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(currentUser),
			});

			setUserImage({
				label: 'Replace profile picture',
				imageUrl: base64,
			});
		} catch (error) {
			setError("Image couldn't be saved :(");
		}
	};

	// Handle image removal
	const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		try {
			setCurrentUser((prev: User) => ({
				...prev,
				userInfo: {
					...prev.userInfo,
					profilePicture: '',
				},
			}));
			fetch(`${serverURL}/users/johndoe01`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(currentUser),
			});

			if (!currentUser.userInfo.profilePicture) {
				setUserImage({
					label: 'Upload profile picture',
					imageUrl: placeholder,
				});
			}
		} catch (error) {
			setError("Image couldn't be removed :(");
		}
	};

	// Load image from json server on component mount
	useEffect(() => {
		try {
			if (currentUser.userInfo.profilePicture) {
				setUserImage({
					label: 'Replace profile picture',
					imageUrl: currentUser.userInfo.profilePicture,
				});
			}
		} catch (error) {
			setError("Image couldn't be loaded :(");
		}
	}, [currentUser.userInfo.profilePicture]);

	return (
		<Row>
			<Col>
				{userImage && (
					<UserPicture
						src={userImage.imageUrl}
						alt={`${currentUser.userInfo.firstName} ${currentUser.userInfo.lastName}`}
						className='mb-3'
						size={imageSize || 200}
					/>
				)}
			</Col>
			<Col className='d-flex flex-column'>
				<label
					htmlFor='files'
					className={styles.imageBtn}
					onChange={handleFileChange}>
					{userImage.label}
				</label>

				<input
					id='files'
					name='userImage'
					className='d-none'
					type='file'
					onChange={handleFileChange}
				/>

				{userImage && userImage.imageUrl !== placeholder && (
					<Button
						onClick={handleRemoveImage}
						label='Remove image'
					/>
				)}
			</Col>
		</Row>
	);
};

export default UploadImage;
