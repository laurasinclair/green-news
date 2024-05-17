import './App.sass'
import { HomePage, Article, UserPage, NotFound } from '@pages'
import { Navbar, Footer, Main } from '@components'
import { FeedContextProvider, UserContextProvider } from '@context'

import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<UserContextProvider>
				<FeedContextProvider>
					<Navbar />

					<Main>
						<Routes>
							<Route path="/" element={<Navigate to="/projects/green-news" />} />

							<Route path="/projects/green-news" element={<HomePage />} />
							<Route path="/projects/green-news/articles/:articleSlug" element={<Article />} />
							<Route path="/projects/green-news/user/johndoe" element={<UserPage />} />
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
