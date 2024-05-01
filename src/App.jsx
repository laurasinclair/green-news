import "./App.sass";
import HomePage from './pages/HomePage'
import Article from './pages/Article'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route 
          path="/" 
          element={<HomePage/>}
        />
        <Route 
          path="/articles/:articleSlug" 
          element={<Article />}
        />
      </Routes>
    </div>
  );
}

export default App;
