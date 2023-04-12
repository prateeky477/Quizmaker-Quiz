import { useState } from 'react'
import CreateQuest from './components/CreateQuest'
import CreateTest from './components/CreateTest'
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import LogOut from './pages/LogOut'
import TakeQuiz from './components/TakeQuiz'

function App() {

  const [isAuth, setIsAuth] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home isAuth={isAuth} />}></Route>
          <Route path='/login' element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
          <Route path='/create-test' element={<CreateTest />}></Route>
          <Route path='/f' element={<TakeQuiz />}></Route>

        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App

