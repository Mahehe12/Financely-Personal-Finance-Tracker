import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// React by def builds spa (Single Page Application) but using 'react-router-dom'  we can have mutiple pages  
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'; //For react notifications 
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
