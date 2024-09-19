import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from 'router';

import './styles/index.sass';

window.name = 'Green News';
window.slogan = 'Your daily dose of nature';

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={Router} />
	</React.StrictMode>
);
