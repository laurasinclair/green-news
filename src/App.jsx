import './App.sass'
import { HomePage, Article, UserPage } from '@pages'
import { Navbar, Footer } from '@components'
import { Routes, Route } from 'react-router-dom'
import UserContextProvider from './components/UserContext'

function App() {
	return (
		<div className="App">
			<UserContextProvider>
				<Navbar />

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/articles/:articleSlug" element={<Article />} />
					<Route path="/user/johndoe" element={<UserPage />} />
				</Routes>
			</UserContextProvider>

			<Footer />
		</div>
	)
}

export default App