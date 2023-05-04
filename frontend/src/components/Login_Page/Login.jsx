import React, { useState } from "react";
import {Link} from "react-router-dom"
function Login() {
  const url = process.env.REACT_APP_URL;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    console.log(email,password);
    if(email && password){
        const data = await fetch(`${url}/login`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers:{
            "Content-Type": "application/json"
          }
        });
        const res = await data.json();
        if(res.token){
            localStorage.setItem("invoiceJWT",res.token);
            setEmail("");
            setPassword("");
            window.location.href="/templateOverview"
        }else{
            alert(res)
        }
    }else{
        alert("All input fields are required")
    }
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-gray-800">
        <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4 ">
          <div className="mb-5 justify-center flex-column text-center">
            <p className="text-gray-400 mt-1">Login</p>
            <h2 className="text-xl font-bold text-white mt-4">Join our community</h2>
          </div>
          <div>
            <input
              className="w-full mt-1 p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              placeholder="Email" value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className="w-full mt-1 p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              placeholder="Password" value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className="w-full mt-1 py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
              onClick={handleSubmit}
            >
              Login In
            </button>
          </div>

          <div className="text-white">
            Not a memeber ? 
              <Link to="/register" className="ml-2" style={{color:'#2563eb'}}>Create Account</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
