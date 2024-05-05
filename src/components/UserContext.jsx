import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext({})
export const useUserContext = () => useContext(UserContext)

export default function UserContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({
		isLoggedIn: false,
		userInfo: {},
	})

	const [error, setError] = useState('Oops')

	useEffect(() => {
		fetch(`http://localhost:7200/users/1`)
		// fetch(`http://localhost:7200/users/{BROKENLINK1`)
			.then((resp) => resp.json())
			.then((data) => {
				if (data.userInfo) {
					setCurrentUser({
						isLoggedIn: true,
						userInfo: data.userInfo
					})
				}
			})
			.catch((err) => setError(`User couldn't be fetched - ${err}`))
	}, [])

	// console.table(currentUser)

	return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>
}