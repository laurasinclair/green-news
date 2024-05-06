import './App.sass'
import { HomePage, Article, UserPage } from '@pages'
import { Navbar, Footer, Main } from '@components'
import { Routes, Route } from 'react-router-dom'
import UserContextProvider from './components/UserContext'

function App() {
	return (
		<div className="App">
			<UserContextProvider>
				<Navbar />
				
				<Main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/articles/:articleSlug" element={<Article />} />
						<Route path="/user/johndoe" element={<UserPage />} />
					</Routes>
				</Main>

			<Footer />
			</UserContextProvider>
		</div>
	)
}

export default App