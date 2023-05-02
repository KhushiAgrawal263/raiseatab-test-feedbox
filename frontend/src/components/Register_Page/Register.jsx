import React, { useState } from "react";
import {Link} from "react-router-dom"
import Register_Page1 from "./Register_Page1";
function Register() {
 
  

  return (
    <div class="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-0 px-4 sm:px-6 lg:px-8 bg-gray-800 bg-no-repeat bg-cover relative items-center">
      <div class="max-w-md w-full space-y-8 p-6 bg-gray-900 rounded-xl shadow-lg z-10">
        <div class="grid  gap-8 grid-cols-1">
          <div class="flex flex-col ">
            <div class="flex flex-col sm:flex-row items-center ml-auto mr-auto">
              <h1 class="font-semibold text-gray-400">Register</h1>
            </div>
            
            
            <form>
            
            <div class="mt-2">
              <Register_Page1/>
            </div>
            <div className="text-white mt-4">
                 Already have an account ? 
                  <Link to="/login" className="ml-2" style={{color:'#2563eb'}}>Login</Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
