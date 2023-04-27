import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InvoicePage from './components/InvoicePage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/invoice' element={<InvoicePage />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
