import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Home_Page from './Components/Home_Page/Home_Page';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './Components/Login_Page/Login';
import Register from './Components/Register_Page/Register';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home_Page/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
      

      </BrowserRouter>
    </div>
  );
}

export default App;
