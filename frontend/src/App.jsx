import Footer from "./components/common/Footer";
import MainLayout from "./components/common/MainLayout";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import AdminDashboard from "./components/HomePage/AdminDashboard";
import AppRouter from "./routes/AppRouter";
import Books from "../src/pages/Books";
import { Route, Routes } from "react-router-dom";


function App() {

  return (
    <div>
      {/* <MainLayout />
      <AppRouter />
      <Footer /> */}
      {/* <Sidebar /> */}
      <Navbar />
      <AppRouter />

      <AdminDashboard />

    </div>
  )
}

export default App;
