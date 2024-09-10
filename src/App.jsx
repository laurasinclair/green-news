import { Outlet } from 'react-router-dom';
import { Navbar, Footer, Main } from '@components';
import { FeedContextProvider, UserContextProvider } from '@context';

function App() {
	return (
		<div className='App'>
			<UserContextProvider>
				<FeedContextProvider>
					<Navbar />

					<Main>
						<Outlet />
					</Main>

					<Footer />
				</FeedContextProvider>
			</UserContextProvider>
		</div>
	);
}

export default App;
