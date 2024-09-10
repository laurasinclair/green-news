import { createBrowserRouter } from 'react-router-dom';

import App from '@/App.jsx';
import { HomePage, Article, UserPage, NotFound } from '@pages';
import { paths } from './paths';

const Router = createBrowserRouter([
	{
		element: <App />,
		path: paths.base,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: paths.base + '/' + paths.articles + '/' + ':articleslug',
				element: <Article />,
			},
			{
				path: paths.base + '/' + paths.user + '/' + ':username',
				element: <UserPage />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
		errorElement: <NotFound />,
	},
]);

export default Router;
