import './App.sass'
import { HomePage, Article, UserPage, NotFound } from '@pages'
import { UserContextProvider, FeedContextProvider, Navbar, Footer, Main } from '@components'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<UserContextProvider>
				<Navbar />
				
				<Main>
					<Routes>
						<FeedContextProvider>
							<Route path="/" element={<HomePage />} />
							<Route path="/articles/:articleSlug" element={<Article />} />
							<Route path="/user/johndoe" element={<UserPage />} />
						</FeedContextProvider>

						<Route path="*" element={<NotFound />} />
					</Routes>
				</Main>

			<Footer />
			</UserContextProvider>
		</div>
	)
}

export default App