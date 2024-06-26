import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.sass';
import { BrowserRouter as Router } from 'react-router-dom'

window.name = "Green News";
window.slogan = "Your daily dose of nature";

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router basename="/projects/green-news">
			<App />
		</Router>
	</React.StrictMode>
)