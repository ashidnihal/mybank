import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Myaccount from './pages/Myaccount'
import Transaction from './pages/Transaction'
import Payment from './pages/Payment'
import AdminUser from './pages/AdminUser'
import AdminTransaction from './pages/AdminTransaction'


function App() {


  return (
    <>
     <Routes>
     <Route path={'/'} element={<Login/> } />
     <Route path={'/register'} element={<Login register />} />

     <Route path={'/dashboard'} element={<Dashboard/> } />
     <Route path={'/admin'} element={<AdminPanel/> } />
     <Route path={'/user/myaccount'} element={<Myaccount/> } />
     <Route path={'/user/transaction'} element={<Transaction/> } />
     <Route path={'/user/payments'} element={<Payment/> } />
     <Route path={'/admin/user'} element={<AdminUser/> } />
     <Route path={'/admin/transactions'} element={<AdminTransaction/> } />
     <Route path={'/admin/transactions'} element={<AdminUser/> } />




    
     </Routes>
     
    </>
  )
}

export default App
