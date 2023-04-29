import React, { useState } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { ImCross } from "react-icons/im";

function InvoicePage() {
  const [options, setOptions] = useState(countryList().getData());
  const [state, setState] = useState("");
  const [value, setValue] = useState("");
  const [imgg, setImgg] = useState();
  const [file, setFile] = useState("");
  const [rows, setRows] = useState([]);
  const [image, setImage] = useState(false);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImgg(e.target.files[0]);
    setImage(!image);
  }

  const crossImage = () => {
    setImage(false);
    setImgg("");
  };

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      description: "",
      quantity: 0,
      price: 0,
      subamount: 0,
    };
    setRows([...rows, newRow]);
  };

  const changeHandler = (e) => {
    setState(e.target.value);
    setValue(state);
  };

  const handleDeleteRow = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };

  return (
    <div className="dark:bg-gray-900 pb-[50px]">
      <div className="text-white text-center p-6 font-[700] text-[27px] text-gray-300">
        Mentoring Invoice
      </div>
      <div className="bg-gray-100 w-[60%] m-auto">
        <div className="flex">
          <div className="flex flex-col p-5 ml-[40px] mt-[30px] gap-3 w-[100%] ">
            {image ? (
              <div>
                <div
                  onClick={crossImage}
                  className="flex text-[20px] text-black  z-50 hover:text-gray-400  cursor-pointer ml-[136px] relative top-[-20px] "
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </div>
                {/* <MdCancel
                        onClick={crossImage}
                        size="22"
                        className="flex text-gray-800  z-50 hover:text-gray-400  cursor-pointer ml-[136px] relative top-[-20px] "
                          /> */}
                <img
                  className="w-[150px] h-[150px] -mt-[35px] object-cover"
                  src={file}
                  alt=""
                />
              </div>
            ) : (
              <div className="flex text-sm text-gray-600">
                <label
                  for="file-upload"
                  className="relative cursor-pointer bg-gray-300 rounded-md font-medium w-[45%] border-dashed border-2 border-gray-400 text-gray-500 "
                >
                  <span className="flex justify-center  p-2 ">Your logo</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    required
                    onChange={handleChange}
                    accept="image/png, image/jpeg"
                    className="sr-only "
                  />
                </label>
              </div>
            )}

            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="Your Company"
            />
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="Your Name"
            />
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="Company's Address"
            />
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="City,State Zip"
            />

            <div id="countryFlag" className="flex item-center w-[70%]">
              <div className="red w-[100%]">
                <Select
                  className="w-[65%]"
                  isSearchable={true}
                  options={options}
                  //   value={value}
                  //   onChange={()=>changeHandler}
                />
              </div>
            </div>
          </div>
          <div className="pr-[100px]  text-[35px] font-[600] mt-[60px]">
            INVOICE
          </div>
        </div>
        <br/><br/>
        <div className="flex ml-[60px] w-[100%] justify-between">
          <div className="flex flex-col gap-3 w-[85%] ">
            <div className="flex gap-1 ">
            <label className="mt-1">Bill To:</label>
            <input
              type="text"
              placeholder="Name"
              className="w-[35.5%] p-1 rounded-md"
            />
            </div>
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="Your Client's Name"
            />
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="Client's Address"
            />
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="Company's Address"
            />
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="City,State Zip"
            />

            <div id="countryFlag" className="flex item-center w-[70%]">
              <div className="red w-[100%]">
                <Select
                  className="w-[65%]"
                  isSearchable={true}
                  options={options}
                  //   value={value}
                  //   onChange={()=>changeHandler}
                />
              </div>
            </div>
          </div>


          <div className="flex flex-col gap-3 w-[85%] ">
          <div className="flex justify-between w-[40%]">
            <label className="mt-1">Invoice id:</label>
            <input
              type="text"
              placeholder="Name"
              className="w-[35.5%] p-1 rounded-md"
            />
            </div>
            
            <div className="flex justify-between w-[40%] ">
            <label className="mt-1">Invoice date:</label>
            <input
              type="text"
              placeholder="Name"
              className="w-[35.5%] p-1 rounded-md"
            />
            </div>

            <div className="flex justify-between w-[40%]">
            <label className="mt-1">Due date:</label>
            <input
              type="text"
              placeholder="Name"
              className="w-[35.5%] p-1 rounded-md"
            />
            </div>

          </div>
        </div>

        <div>
          <table class="ml-[60px] mt-[30px] table-auto w-[88%] ">
            <thead className="dark:bg-gray-900 text-gray-300 font-[100]">
              <tr>
                <th className="text-left p-2">Item Description</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Price</th>
                <th className="text-left">Sub Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((rows) => (
                <tr key={rows.id} class="border-b border-gray-400">
                  <td className="p-2">
                    <textarea
                      placeholder="Enter Item Name"
                      className=" bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:bg-gray-200 pl-2 rounded-sm"
                    />
                  </td>

                  <td className="p-2">
                    <input
                      type="number"
                      className="w-[45%] bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:bg-gray-200 rounded-sm"
                      placeholder="Quantity"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      className="w-[45%] bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:bg-gray-200 rounded-sm
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Price"
                    />
                  </td>
                  <td className="p-2">50</td>
                  <td>
                    <ImCross
                      onClick={() => handleDeleteRow(rows.id)}
                      size="17"
                      className="text-gray-500 hover:text-gray-400 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 ml-[60px]">
          <div
            onClick={handleAddRow}
            className="flex cursor-pointer gap-2 hover:text-gray-500"
          >
            <AiFillPlusCircle size="22" style={{ marginTop: "1px" }} />
            Add Items
          </div>
        </div>

        <hr class="w-[88%] mt-4  ml-[60px] h-0.5 bg-gray-100 border-0 border-dashed rounded md:my-10 dark:bg-gray-300"></hr>
        <div className="text-right mr-[45px] text-[18px] flex flex-col gap-2 pb-6">
          <div>
            <span className="text-left text-gray-400">Subtotal:</span>
            <span className="text-right ml-4 text-gray-500">200</span>{" "}
          </div>
          <div>
            <span className="justify-left text-gray-400">Taxes: </span>
            <span className="text-right ml-4 text-gray-500">10%</span>
          </div>
          <div>
            <span className="text-gray-500 text-gray-400">Total: </span>
            <span className="text-right ml-4 text-gray-500">200</span>
          </div>
        </div>

        <div className="ml-[60px] pb-5 flex gap-3">
          <button className="bg-black rounded-md p-3 text-white hover:bg-gray-400 hover:text-black font-[700]">
            Generate Invoice
          </button>
          <button className="bg-black rounded-md p-3 text-white hover:bg-gray-400 hover:text-black font-[700]">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
