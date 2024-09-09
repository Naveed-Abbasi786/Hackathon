import React from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Register from '../RegisterPage/Register'
import Signin from '../SignIn/Sign'
import User from '../UserPage/User'
import Admin from '../AdminPage/admin'
import ViewJob from '../UserPage/ViewJobs'
import Event from '../UserPage/ViewAllEvents'
import AppliedJob from '../UserPage/Applied'
// import DashboardContent from '../Dashbord'
export default function Router() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='SignIn' element={<Signin/>}/>
        <Route path='Admin' element={<Admin/>}/>
        <Route path='User' element={<User/>}/>
        <Route path='ViewJob' element={<ViewJob/>}/>
        <Route path='Events' element={<Event/>}/>
        <Route path='AppliedJob' element={<AppliedJob/>}/>
      </Routes>
      </BrowserRouter>
    
  )
}
