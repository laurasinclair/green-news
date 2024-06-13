import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUsers } from '../api/Api';
import axios from 'axios';

const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({
		isLoggedIn: false,
		userInfo: {},
	});

	const [error, setError] = useState('Oops');

	useEffect(() => {
		fetchUsers()
		.then((res) => {
			if (res.userInfo) {
				setCurrentUser({
					isLoggedIn: true,
					userInfo: res.userInfo,
				});
			}
		})
		.catch((err) => setError(err))
	}, []);

	// console.table(currentUser);

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
}
