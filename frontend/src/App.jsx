
import Navbar from "./components/common/Navbar";
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

    </div>
  )
}

export default App;
