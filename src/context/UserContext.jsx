import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchUser } from 'api';
import { paths } from 'router/paths';
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

	const getUser = async () => {
		const storedUser = getData('storedUser');

		if (!storedUser) {
			try {
				const userRes = await fetchUser('johndoe01');

				if (!userRes._id) {
					throw new Error('Problem fetching user');
				}

				storeData('storedUser', {
					id: userRes._id,
					isLoggedIn: true,
					userInfo: userRes.userInfo,
				});
			} catch (error) {
				console.error(error.message);
			}
		}

		setCurrentUser({
			id: storedUser.id,
			isLoggedIn: true,
			userInfo: storedUser.userInfo,
		});
	};

	useEffect(() => {
		getUser();
	}, []);

	const handleLogIn = (e) => {
		e.preventDefault();

		if (currentUser.id !== undefined && !currentUser.isLoggedIn) {
			setCurrentUser({
				...currentUser,
				isLoggedIn: true,
			});
		} else {
			getUser();
		}
	};

	const handleLogOut = (e) => {
		e.preventDefault();

		setCurrentUser({
			...currentUser,
			isLoggedIn: false,
		});
		navigate(paths.base);
	};

	return (
		<UserContext.Provider
			value={{ currentUser, setCurrentUser, handleLogIn, handleLogOut }}>
			{children}
		</UserContext.Provider>
	);
}
