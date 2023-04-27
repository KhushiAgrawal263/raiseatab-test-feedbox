import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TemplateOverview from './components/TemplateOverview';
import PricingPage from './components/PricingPage';


function App() {
  return (
    <div>
       <Router>
        <Routes>
          <Route path="/templateOverview" element={<TemplateOverview />} />
          <Route path="/pricingPage" element={<PricingPage />} />
        </Routes>
        </Router>
    </div>
    );
}

export default App;
