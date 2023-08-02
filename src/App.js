import {  BrowserRouter, Route, Routes } from "react-router-dom";
import "./Global/GlobalStyle/style.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Logout from "./pages/Login/Logout";
import Signup from "./pages/Signup/Signup";
import MainPage from "./pages/MainPage/MainPage";
import CoinPage from "./pages/CoinPage/CoinPage";


function App() {
  return (
   <div className="appcontainer">
    <Navbar/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/coin/:coinid" element={<CoinPage/>}/>
    </Routes>
    </BrowserRouter>
    
   </div>
  );
}

export default App;