import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductByCategory from './pages/ProductByCategory'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products/>}></Route>
        <Route path='/product/category/:cat' element={<ProductByCategory/>}></Route>
        <Route path='/product/detail/:id' element={<ProductDetail/>}></Route>
        <Route path='/login' element={<Login/>}></Route> 
        <Route path='/register' element={<Register/>}></Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/cart' element={<Cart/>}></Route>
        </Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App