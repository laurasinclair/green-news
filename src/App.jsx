import "./App.sass";
import HomePage from './pages/HomePage'
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
      </Routes>
    </div>
  );
}

export default App;
