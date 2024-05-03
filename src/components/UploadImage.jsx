import React, { useState, useEffect, useContext } from 'react'
import placeholder from '@img/placeholder_1-1.jpg'
import styles from './styles/DisplayImage.module.sass'
import { Row, Col } from 'react-bootstrap'
import { UserContext } from '@components'

const UploadImage = () => {
	const { currentUser } = useContext(UserContext)

	const [userImage, setUserImage] = useState({
		imageUrl: placeholder,
		label: 'Upload profile picture',
	})
	const [error, setError] = useState(null)

	// convert image file to Base64 string
	const convertToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onloadend = () => {
				resolve(reader.result)
			}
			reader.onerror = reject
			reader.readAsDataURL(file)
		})
	}

	// Handle file change event
	const handleFileChange = async (event) => {
		const file = event.target.files[0]
		if (file) {
			// convert the image file to Base64 string
			const base64 = await convertToBase64(file)

			try {
				currentUser.profilePicture = base64
				await fetch('http://localhost:7200/users/1', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(currentUser),
				})
				setUserImage({
					label: 'Replace profile picture',
					imageUrl: base64,
				})
				console.log('image successfully uploaded')
			} catch (error) {
				setError("Image couldn't be saved :(", error)
			}
		}
	}

	// Handle image removal
	const handleRemoveImage = () => {
		try {
			currentUser.profilePicture = ''
			fetch('http://localhost:7200/users/1', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(currentUser),
			})

			if (!currentUser.profilePicture) {
				setUserImage({
					label: 'Upload profile picture',
					imageUrl: placeholder,
				})
			}
		} catch (error) {
			setError("Image couldn't be removed :(", error)
		}
	}

	// Load image from json server on component mount
	useEffect(() => {
		try {
			if (currentUser.profilePicture) {
				setUserImage({
					label: 'Replace profile picture',
					imageUrl: currentUser.profilePicture,
				})
			}
		} catch (error) {
			setError("Image couldn't be loaded :(", error)
		}
	}, [currentUser.profilePicture])

	return (
		<Row>
			<Col>
				<div className={styles.profilePic}>{userImage && <img alt="Not found" width={'250px'} src={userImage.imageUrl} />}</div>
			</Col>
			<Col className="d-flex flex-column">
				<label htmlFor="files" className={styles.imageBtn} name="myImage" onChange={handleFileChange}>
					{userImage.label}
				</label>

				<input id="files" name="myImage" className="d-none" type="file" onChange={handleFileChange} />

				{userImage && userImage.imageUrl !== placeholder && (
					<button onClick={handleRemoveImage} className={styles.imageBtn}>
						Remove image
					</button>
				)}
			</Col>
		</Row>
	)
}

export default UploadImage