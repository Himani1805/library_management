import { Routes, Route } from "react-router-dom";
import './App.css'
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Dashboard from "./components/common/Dashboard";
import Footer from "./components/common/Footer";
import MainLayout from "./components/common/MainLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";


function App() {


  return (
    <div>
      <MainLayout />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/dashboardStudent" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
