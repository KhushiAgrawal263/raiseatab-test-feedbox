import React, { useEffect } from 'react'
import Draft from './Draft';
import Invoice from './Invoice';
import { useState } from 'react';
function ProfileTabs() {
    const [tabs, setTabs] = useState("Invoice");
   
   useEffect(()=>{},[])
  return (
    <>
        <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400 justify-center">
            <li className="w-50" onClick={()=>setTabs("Invoice")}>
                <a href="#" 
                className={`inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-lg  dark:bg-gray-700 dark:text-white ${tabs === 'Invoice' ? 'ring-blue-300 ring-4   active ': ''}`}
                    
                >Invoice</a>
            </li>
            <li className="w-50 ml-2 rounded-lg" onClick={()=>setTabs("Draft")}>
                <a href="#"
                 className={`inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-lg  dark:bg-gray-700 dark:text-white ${tabs === 'Draft' ? 'ring-blue-300 ring-4   active ': ''}`}
                >Drafts</a>
            </li>
        </ul>
        <div>
        {
         tabs=="Invoice"?<Invoice/>:<Draft/>   
        }
        </div>
    </>
  )
}

export default ProfileTabs