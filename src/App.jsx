import "./App.sass";
import { HomePage, Article, UserPage } from '@pages'
import { Navbar } from '@components'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
    // fetching the users
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
      fetch(`http://localhost:7200/users/`)
        .then((resp) => resp.json())
        .then((data) => setUsers(data))
        .catch((err) => setError(`User couldn't be fetched - ${err}`))
    }, [])

    useEffect(() => {
      if (users && users[0]) {
        setCurrentUser(users[0])
        setLoading(false)
      } else {
        setError('No users to display')
      }
    }, [users, currentUser])

  return (
    <div className="App">
      <Navbar currentUser={currentUser} />

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
