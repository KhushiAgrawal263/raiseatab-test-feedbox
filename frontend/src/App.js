import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TemplateOverview from './components/TemplateOverview';
import PricingPage from './components/PricingPage';
import NavBar from './components/NavBar/NavBar.js';
import Home_Page from './components/Home_Page/Home_Page';


function App() {
  return (
    <div>
       <NavBar/>
       <Router>
        <Routes>
          <Route path="/" element={<Home_Page />} />
          <Route path="/templateOverview" element={<TemplateOverview />} />
          <Route path="/pricingPage" element={<PricingPage />} />
        </Routes>
        </Router>
        </div>
        )
}

export default App;
