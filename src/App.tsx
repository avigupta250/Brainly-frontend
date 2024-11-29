
import './App.css'
import DashBoard from './components/Pages/Dashboard'
// import SignIn from './components/Pages/SignIn'
import Signup from './components/Pages/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/RouteType/ProtectedRoute'
import  { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil'
import PublishedBrain from './components/Pages/PublishedBrain'
function App() {


  return (
    <BrowserRouter>
      <>
      <RecoilRoot>
        <Routes>
          {/* added signup and sign in the signup component */}
          <Route path="/" element={<Signup />} />
          {/* <Route path="/signin" element={<SignIn />} /> */}
<Route path="/share/:hash" element={<PublishedBrain/>}></Route>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          } />



        </Routes>
        </RecoilRoot>
      </>

      <Toaster/>
    </BrowserRouter>
  )
}

export default App

