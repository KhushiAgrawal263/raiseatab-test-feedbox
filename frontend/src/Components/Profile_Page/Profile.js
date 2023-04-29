import React from 'react'
import ProfileTabs from './ProfileTabs'

function Profile() {
  return (
    <div>
         <div className="w-[90vw] md:w-9/12 ml-auto mr-auto">
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide">About</span>
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Name : </div>
                                <div className="px-4 py-2">Aditya Pandey</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Company Name :</div>
                                <div className="px-4 py-2">Feedbox</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Company Address :</div>
                                <div className="px-4 py-2">Saket, Old Palasia, Indore</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">GST No. :</div>
                                <div className="px-4 py-2">07AAGFF2194N1Z1</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">PAN Card :</div>
                                <div className="px-4 py-2">QE32IXGPVU</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Email</div>
                                <div className="px-4 py-2">xyz@gmail.com</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Email.</div>
                                <div className="px-4 py-2">
                                    <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Contact No. :</div>
                                <div className="px-4 py-2">9865745682</div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="my-5"></div>
                <ProfileTabs/>
            </div>
            
    </div>
  )
}

export default Profile