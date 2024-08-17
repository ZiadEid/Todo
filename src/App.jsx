import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Login from './Pages/Login/index';
import Register from './Pages/Register/index';
import './app.css'

function App() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={
              token ? <Home /> : <Login />
            } />
            <Route path='login' element={
              token ? <Home /> : <Login />
            } />
            <Route path='register' element={
              token ? <Home /> : <Register />
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
