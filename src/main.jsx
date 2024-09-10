import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './router';

import './styles/index.sass';

window.name = 'Green News';
window.slogan = 'Your daily dose of nature';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={Router} />
	</React.StrictMode>
);
