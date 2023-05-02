import React from 'react'
import { useState } from 'react';
function Register_Page1() {
    const url = process.env.REACT_APP_URL;
    const [logo, setLogo] = useState(
      "https://images.unsplash.com/photo-1611867967135-0faab97d1530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1352&amp;q=80"
    );
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [companyAdd, setCompanyAdd] = useState("");
  const [pan, setPan] = useState("");

  const handleRegister = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !companyName ||
      !gstNo ||
      !companyAdd ||
      !logo ||
      !pan
    ) {
      alert("All input fields are required");
    } else {
      const formData = new FormData();
      formData.append("logo", logo);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("gstNo", gstNo);
      formData.append("panNo", pan);
      formData.append("companyAddress", companyAdd);
      formData.append("companyName", companyName);

      const data = await fetch(`${url}/register`, {
        method: "POST",
        body: formData,
      });
      const res = await data.json();
      if(res){
        alert(res);
        window.location.href="/login"
      }
    }
  };
  return (
    <div>
        <div class="form">
                <div class="md:space-y-2 mb-1 ">
                  <label class="text-xs font-bold text-white py-1 text-left">
                    Company Logo
                    <abbr class="hidden" title="required">
                      *
                    </abbr>
                  </label>
                  <div class="flex items-center py-3 flex justify-center">
                    <div class="w-20 h-20 mr-4 flex-none rounded-xl border overflow-hidden">
                      <img
                        class="w-20 h-20 mr-4 object-cover"
                        src={logo && logo}
                        alt="Avatar Upload"
                      />
                    </div>
                    <label class="cursor-pointer ">
                      <span class=" py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">
                        Browse
                      </span>
                      <input
                        type="file"
                        class="hidden"
                        multiple="multiple"
                        accept="image/*"
                        onChange={(e) => {
                          setLogo(e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div class="md:flex flex-row md:space-x-4 w-full text-xs ">
                  <div class="mb-3 space-y-2 w-full text-xs  text-left">
                    <label class="text-xs font-bold text-white  ">
                      Personal Name <abbr title="required">*</abbr>
                    </label>
                    <input
                      placeholder=" Name"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      required="required"
                      type="text"
                      name="integration[shop_name]"
                      id="integration_shop_name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <p class="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                  <div class="mb-3 space-y-2 w-full text-xs text-left">
                    <label class="text-xs font-bold text-white  ">
                      Company Name <abbr title="required">*</abbr>
                    </label>
                    <input
                      placeholder="Company Name"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      required="required"
                      type="text"
                      name="integration[shop_name]"
                      id="integration_shop_name"
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <p class="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                </div>
                <div class="md:flex md:flex-row md:space-x-4 w-full text-xs text-left">
                  <div class="w-full flex flex-col mb-3">
                    <label class="text-xs font-bold text-white mb-2">
                      Company Address
                    </label>
                    <input
                      placeholder="Address"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      type="text"
                      name="integration[street_address]"
                      id="integration_street_address"
                      onChange={(e) => setCompanyAdd(e.target.value)}
                    />
                  </div>
                </div>
                <div class="md:flex flex-row md:space-x-4 w-full text-xs text-left">
                  <div class="mb-3 space-y-2 w-full text-xs">
                    <label class="text-xs font-bold text-white  ">
                      GST No. <abbr title="required">*</abbr>
                    </label>
                    <input
                      placeholder="07AAGFF2194N1Z1"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      required="required"
                      type="text"
                      name="integration[shop_name]"
                      id="integration_shop_name"
                      onChange={(e) => setGstNo(e.target.value)}
                    />
                    <p class="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                  <div class="mb-3 space-y-2 w-full text-xs text-left">
                    <label class="text-xs font-bold text-white  ">
                      PAN Card <abbr title="required">*</abbr>
                    </label>
                    <input
                      placeholder="QE32IXGPVU"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      required="required"
                      type="text"
                      name="integration[shop_name]"
                      id="integration_shop_name"
                      onChange={(e) => setPan(e.target.value)}
                    />
                    <p class="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                </div>
                <div class="md:flex flex-row md:space-x-4 w-full text-xs text-left">
                  <div class="mb-3 space-y-2 w-full text-xs">
                    <label class="text-xs font-bold text-white ">
                      Email <abbr title="required">*</abbr>
                    </label>
                    <input
                      placeholder="xyz@gmail.com"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      required="required"
                      type="email"
                      name="integration[shop_name]"
                      id="integration_shop_name"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p class="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                  <div class="mb-3 space-y-2 w-full text-xs">
                    <label class="text-xs font-bold text-white  ">
                      Password <abbr title="required">*</abbr>
                    </label>
                    <input
                      placeholder="****"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      required="required"
                      type="password"
                      name="integration[shop_name]"
                      id="integration_shop_name"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p class="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                </div>

                <div class="mt-5 text-center md:space-x-3 md:block flex flex-col-reverse">
                  <button
                    type="submit"
                    class="mb-2 md:mb-0  px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
                    onClick={handleRegister}
                  >
                    Save
                  </button>
                </div>

                
              </div>
    </div>
  )
}

export default Register_Page1