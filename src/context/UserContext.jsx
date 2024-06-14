import { createContext, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { fetchUsers } from '../api/Api';
import { getData, storeData } from '@utils';

const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
	const navigate = useNavigate();

	const [currentUser, setCurrentUser] = useState({
		id: undefined,
		isLoggedIn: false,
		userInfo: {},
	});

	const getUser = () => {
		const storedUser = getData('storedUser');

		if (!storedUser) {
			fetchUsers()
				.then((res) => {
					if (res.userInfo) {
						setCurrentUser({
							id: res._id,
							isLoggedIn: true,
							userInfo: res.userInfo,
						});

						storeData('storedUser', {
							id: res._id,
							isLoggedIn: true,
							userInfo: res.userInfo,
						});
					}
				})
				.catch((err) => console.error(err));
		} else {
			setCurrentUser({
				...storedUser,
			});
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	const handleLogIn = (e) => {
		e.preventDefault();

		if (currentUser && !currentUser.isLoggedIn) {
			console.log('user exists but is not logged in')
			setCurrentUser({
				...currentUser,
				isLoggedIn: true,
			})
		} else {
			console.log('user doesnt exist and isnt logged in')
			getUser();
		}
	};

	const handleLogOut = (e) => {
		e.preventDefault();

		setCurrentUser({
			...currentUser,
			isLoggedIn: false,
		});
		navigate('/');
	};

	useEffect(() => {
		currentUser.isLoggedIn
			? console.info(
					'%c👤 User successfully logged in!',
					'color: #2B3B20; padding: 6px 8px; background-color: #6FBF6B; display: inline-block; border-radius: 4px;'
			  )
			: console.info(
					'%c👤 User logged out',
					'color: #FFDAD6; padding: 6px 8px; background-color: #4F3534; display: inline-block; border-radius: 4px;'
			  );
	}, [currentUser.isLoggedIn]);

	return (
		<UserContext.Provider
			value={{ currentUser, setCurrentUser, handleLogIn, handleLogOut }}>
			{children}
		</UserContext.Provider>
	);
}
