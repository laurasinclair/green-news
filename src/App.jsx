import "./App.sass";
import { HomePage, Article, UserPage } from '@pages'
import { Navbar } from '@components'
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
        <Route 
          path="/user/johndoe" 
          element={<UserPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
