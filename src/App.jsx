import './App.sass'
import { HomePage, Article, UserPage } from '@pages'
import { UserContext, Navbar } from '@components'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react'

function App() {
	const [error, setError] = useState('')
	const [currentUser, setCurrentUser] = useState()
	
	useEffect(() => {
		fetch(`http://localhost:7200/users/1`)
			.then((resp) => resp.json())
			.then((data) => setCurrentUser(data))
			.catch((err) => setError(`User couldn't be fetched - ${err}`))
	}, [])

	return (
		<div className="App">
			<UserContext.Provider value={{ currentUser, setCurrentUser }}>
				<Navbar />

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/articles/:articleSlug" element={<Article />} />
					<Route path="/user/johndoe" element={<UserPage />} />
				</Routes>
			</UserContext.Provider>
		</div>
	)
}

export default App
