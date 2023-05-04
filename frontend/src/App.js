import './App.css';
import { Routes, Route } from "react-router-dom";
import TemplateOverview from './components/TemplateOverview';
import PricingPage from './components/PricingPage';
import NavBar from './components/NavBar/NavBar';
import Home_Page from './components/Home_Page/Home_Page';
import InvoicePage from './components/InvoicePage';
import Login from './components/Login_Page/Login';
import Register from './components/Register_Page/Register';
import Profile from "./components/Profile_Page/Profile"
import Temp from './components/Profile_Page/Temp';

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home_Page />} />
        <Route path="/templateOverview" element={<TemplateOverview />} />
        <Route path="/pricingPage" element={<PricingPage />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/invoicePage" element={<InvoicePage />} />
        <Route path="/temp" element={<Temp/>} />

      </Routes>
    </div>
  );
}

export default App;
