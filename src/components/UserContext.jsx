import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext({})
export const useUserContext = () => useContext(UserContext)

export default function UserContextProvider ({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [error, setError] = useState('Oops')

	useEffect(() => {
		fetch(`http://localhost:7200/users/1`)
			.then((resp) => resp.json())
			.then((data) => setCurrentUser(data))
			.catch((err) => setError(`User couldn't be fetched - ${err}`))
	}, [setCurrentUser])

    return <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
    </UserContext.Provider> 
}