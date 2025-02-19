import {Routes, Route, useLocation} from 'react-router-dom'

import {AnimatePresence} from 'framer-motion'

// pages
import HomePage from './pages/home'
import BasketPage from './pages/basket'
import OrdersPage from './pages/orders'
import ProfilePage from './pages/profile'

// components
import MenuBar from './components/menu-bar'


const App = () => {
  const { pathname } = useLocation()

  return (
      <>
      <AnimatePresence mode='wait'>
        <Routes location={pathname} key={pathname}>
          <Route index path='/' element={<HomePage />} />
          <Route index path='/cart' element={<BasketPage />} />
          <Route index path='/orders' element={<OrdersPage />} />
          <Route index path='/profile' element={<ProfilePage />} />
        </Routes>
      </AnimatePresence>
        <MenuBar />
      </>
  )
}

export default App
