import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TemplateOverview from "./Components/TemplateOverview";
import PricingPage from "./Components/PricingPage";
import NavBar from "./Components/NavBar/NavBar.js";
import Home_Page from "./Components/Home_Page/Home_Page";

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home_Page />} />
          <Route path="/templateOverview" element={<TemplateOverview />} />
          <Route path="/pricingPage" element={<PricingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
