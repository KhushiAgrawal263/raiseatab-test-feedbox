import React, { useState } from "react";
import { Link } from "react-router-dom";
import countryList from "react-select-country-list";
import Select from "react-select";
import userPng from "../assests/user.png";
function Register() {
  const url = process.env.REACT_APP_URL;
  const [logo, setLogo] = useState("");
  const [logoStatus, setLogoStatus] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [companyAdd, setCompanyAdd] = useState("");
  const [pan, setPan] = useState("");
  const [client_country, setClient_country] = useState("");
  const [options, setOptions] = useState(countryList().getData());
  const [personalAdd, setPersonalAdd] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");

  const handleRegister = async () => {
    // if (
    //   !name ||
    //   !email ||
    //   !password ||
    //   !companyName ||
    //   !gstNo ||
    //   !companyAdd ||
    //   !logo ||
    //   !pan ||
    //   !client_country ||
    //   !personalAdd ||
    //   !city ||
    //   !state ||
    //   !pin
    // ) {
    //   alert("All input fields are required");
    // } else {
      const formData = new FormData();
      formData.append("logo", logo);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("gstNo", gstNo);
      formData.append("panNo", pan);
      formData.append("companyAddress", companyAdd);
      formData.append("companyName", companyName);
      // formData.append("personalAddress", personalAdd);
      // formData.append("city", city);
      // formData.append("state", state);
      // formData.append("country", client_country);
      // formData.append("pin", pin);

      const data = await fetch(`${url}/register`, {
        method: "POST",
        body: formData,
      });
      const res = await data.json();
      if (res) {
        alert(res);
        window.location.href = "/login";
      }
    // }
  };

  const changeClientCountry = (countryVal) => {
    setClient_country({ countryVal });
  };

  return (
    <div class="relative min-h-screen flex items-center justify-center bg-center py-0 px-4 sm:px-6 lg:px-8 bg-gray-800 bg-no-repeat bg-cover ">
      <div class="max-w-[45%] w-full space-y-8 p-6 bg-gray-900 rounded-xl shadow-lg z-10 m-5">
        <form onSubmit={handleRegister}>
        <div class="grid  gap-8 grid-cols-1">
          <div class="flex flex-col ">
            <div class="flex flex-col sm:flex-row items-center ml-auto mr-auto">
              <h1 class="font-semibold text-xl text-gray-400">Register</h1>
            </div>
            <div class="mt-2">
              <div class="form">
                <div class="md:space-y-2 mb-1 ">
                  <label class="text-base font-bold text-white py-1 text-left">
                    Company Logo
                    <abbr class="hidden" title="required">
                      *
                    </abbr>
                  </label>
                  <div class="flex items-center py-3  justify-center">
                    <div class="w-20 h-20 mr-4 flex-none rounded-xl border overflow-hidden">
                      {logoStatus?
                      <img
                        class="w-20 h-20 mr-4 object-cover bg-white"
                        src={logo && logo}
                        alt="Avatar Upload"
                      />
                        :
                        <img
                        class="w-20 h-20 mr-4 object-cover bg-white"
                        src={userPng}
                        alt="Avatar Upload"
                      />
                      }
                    </div>
                    <label class="cursor-pointer ">
                      <span class=" py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">
                        Browse
                      </span>
                      <input
                        type="file"
                        class="hidden"
                        required
                        multiple="multiple"
                        accept="image/*"
                        onChange={(e) => {
                          setLogo(URL.createObjectURL(e.target.files[0]));
                          setLogoStatus(true);
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div class="md:flex flex-row md:space-x-4 w-full text-xs ">
                  <div class="mb-3 space-y-2 w-full text-xs  text-left">
                    <label class="text-sm font-bold text-white ">
                      Personal Name 
                      {/* <abbr title="required">*</abbr> */}
                    </label>
                    <input
                      placeholder="Enter Name"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
                      required
                      type="text"
                      name="integration[shop_name]"
                      id="integration_shop_name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div class="mb-3 space-y-2 w-full text-xs text-left">
                    <label class="text-sm font-bold text-white  ">
                      Company Name 
                      {/* <abbr title="required">*</abbr> */}
                    </label>
                    <input
                      placeholder="Enter company name"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
                      required
                      type="text"
                      name="integration[shop_name]"
                      id="integration_shop_name"
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
                <div class="md:flex md:flex-row md:space-x-4 w-full text-xs text-left">
                  <div class="w-full flex flex-col mb-3">
                    <label class="text-sm font-bold text-white mb-2">
                      Company Address
                    </label>
                    <input
                      placeholder="Enter company address"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
                      type="text"
                      required
                      name="integration[street_address]"
                      id="integration_street_address"
                      onChange={(e) => setCompanyAdd(e.target.value)}
                    />
                  </div>
                </div>

                <div class="md:flex md:flex-row md:space-x-4 w-full text-xs text-left">
                  <div class="w-full flex flex-col mb-3">
                    <label class="text-sm font-bold text-white mb-2">
                      Personal Address
                    </label>
                    <input
                      placeholder="Enter personal address"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
                      type="text"
                      required
                      name="integration[street_address]"
                      id="integration_street_address"
                      onChange={(e) => setPersonalAdd(e.target.value)}
                    />
                  </div>
                </div>

                <div class="md:flex flex-row md:space-x-4 w-full text-xs text-left">
                  <div class="mb-3 space-y-2 w-full text-xs">
                    <label class="text-sm font-bold text-white  ">
                      GST No. 
                      {/* <abbr title="required">*</abbr> */}
                    </label>
                    <input
                      placeholder="Enter GST No."
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
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
                    <label class="text-sm font-bold text-white  ">
                      PAN No. 
                      {/* <abbr title="required">*</abbr> */}
                    </label>
                    <input
                      placeholder="Enter PAN no."
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
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
                    <label class="text-sm font-bold text-white ">
                      Email 
                      {/* <abbr title="required">*</abbr> */}
                    </label>
                    <input
                      placeholder="Enter email"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
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
                    <label class="text-sm font-bold text-white  ">
                      Password 
                      {/* <abbr title="required">*</abbr> */}
                    </label>
                    <input
                      placeholder="Enter password"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
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

                <div class="md:flex flex-row md:space-x-4 w-full text-xs text-left">
                  <div class="mb-3 space-y-2 w-full text-xs">
                    <label class="text-sm font-bold text-white ">
                      City 
                      {/* <abbr title="required">*</abbr> */}
                    </label>
                    <input
                      placeholder="Enter city"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
                      required="required"
                      type="text"
                      name="integration[shop_name]"
                      id="integration_shop_name"
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <p class="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                  <div class="mb-3 space-y-2 w-full text-xs">
                    <label class="text-sm font-bold text-white  ">
                      State 
                      {/* <abbr title="required">*</abbr> */}
                    </label>
                    <input
                      placeholder="Enter state"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
                      required="required"
                      type="text"
                      name="integration[shop_name]"
                      id="integration_shop_name"
                      onChange={(e) => setState(e.target.value)}
                    />
                    <p class="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                </div>

                <div class="md:flex flex-row md:space-x-4 w-full text-xs text-left">
                  <div class="mb-3 space-y-2 w-full text-xs">
                    <label class="text-sm font-bold text-white ">
                      Country 
                      {/* <abbr title="required">*</abbr> */}
                    </label>
                    <Select
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
                      isSearchable={true}
                      options={options}
                      // value={user && user.client_country}
                      onChange={(e) => changeClientCountry}
                      required
                    />
                    <p class="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                  <div class="mb-3 space-y-2 w-full text-xs">
                    <label class="text-sm font-bold text-white  ">
                      Pin Code 
                      {/* <abbr title="required">*</abbr> */}
                    </label>
                    <input
                      placeholder="Enter pin code"
                      class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-[40px] text-base px-4"
                      required="required"
                      type="number"
                      name="integration[shop_name]"
                      id="integration_shop_name"
                      onChange={(e) => setPin(e.target.value)}
                    />
                    <p class="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                </div>

                <div class="mt-5 text-center md:space-x-3 md:block flex flex-col-reverse">
                  <button
                    type="submit"
                    class="mb-2 md:mb-0  px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded text-lg font-bold text-gray-50 transition duration-200"
                    // onClick={handleRegister}
                  >
                    Save
                  </button>
                </div>

                <div className="text-white mt-4">
                  Already have an account ?
                  <Link
                    to="/login"
                    className="ml-2"
                    style={{ color: "#2563eb" }}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Register;