import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Products/>}></Route> 
        <Route path='/login' element={<Login/>}></Route> 
        <Route path='/register' element={<Register/>}></Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
