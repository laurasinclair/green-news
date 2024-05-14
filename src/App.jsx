import './App.sass'
import { HomePage, Article, UserPage, NotFound } from '@pages'
import { Navbar, Footer, Main } from '@components'
import FeedContextProvider from '@components/FeedContext'
import UserContextProvider from '@components/UserContext'

import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<UserContextProvider>
			<FeedContextProvider>
				<Navbar />
				
				<Main>
					<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/articles/:articleSlug" element={<Article />} />
							<Route path="/user/johndoe" element={<UserPage />} />

						<Route path="*" element={<NotFound />} />
					</Routes>
				</Main>

			<Footer />
			</FeedContextProvider>
			</UserContextProvider>
		</div>
	)
}

export default App