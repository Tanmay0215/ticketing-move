import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Events from './pages/Events'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Event from './pages/Event'
import Payment2 from './pages/Payment2'
import BillingPage2 from './pages/BillingPage2'
import NFTMinter from './pages/AptosInteract'

function App() {
  return (
    <div className="w-full min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Billing/:id" element={<BillingPage2 />} />
        <Route path="/Event/:id" element={<Event />} />
        <Route path="/Payment/:id" element={<Payment2 />} />
        <Route path="/aptos" element={<NFTMinter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
