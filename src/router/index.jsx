import { createBrowserRouter } from 'react-router-dom';

import App from '@/App.jsx';
import { HomePage, Article, UserPage, NotFound } from '@pages';

const Router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/articles/:articleSlug',
				element: <Article />,
			},
			{
				path: '/user/:username',
				element: <UserPage />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

export default Router;
