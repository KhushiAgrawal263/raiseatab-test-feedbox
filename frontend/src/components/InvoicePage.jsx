import React, { useState } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function InvoicePage() {
  const location = useLocation();
  console.log(location);
  const [options, setOptions] = useState(countryList().getData());
  const [value, setValue] = useState("");

  const [imgg, setImgg] = useState();
  const [file, setFile] = useState("");
  const [rows, setRows] = useState([]);
  const [image, setImage] = useState(false);

  const [invoiceNo, setInvoiceNo] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState(false);
  const [invoiceTotal, setInvoiceTotal] = useState(false);
  const [comp_name, setComp_name] = useState(false);
  const [compAdd, setComp_add] = useState(false);
  const [city, setCity] = useState(false);
  const [state, setState] = useState(false);
  const [zip, setzip] = useState(false);
  const [contactNo, setContactNo] = useState(false);
  const [comp_email, setComp_email] = useState(false);
  const [country, setCountry] = useState(false);
  const [client_name, setClient_name] = useState(false);
  const [client_comp_name, setClient_comp_name] = useState(false);
  const [clientAdd, setClient_add] = useState(false);
  const [client_comp_add, setClient_comp_add] = useState(false);
  const [client_city, setClient_city] = useState(false);
  const [client_state, setClient_state] = useState(false);
  const [client_zip, setClient_zip] = useState(false);
  const [client_contact_no, setClient_contact_no] = useState(false);
  const [client_email, setClient_email] = useState(false);
  const [client_country, setClient_country] = useState(false);
  const [subTotal, setSubTotal] = useState(false);
  const [tax, setTax] = useState(false);
  const [total, setTotal] = useState(false);
  const [dueDate, setDueDate] = useState(false);

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

  const handleSaveDraft = () => {
    console.log(imgg);
  };

  return (
    <div className="dark:bg-gray-900 pb-[50px]">
      <div className="text-white text-center p-6 font-[700] text-[27px] text-gray-300">
       {location.state && location.state.name==='mentoring'?"Mentoring Invoice":""}
       {location.state && location.state.name==='generic'?"Generic Consulting Invoice":""}
       {location.state && location.state.name==='reference'?"Reference Introduction":""}
       {location.state && location.state.name==='business'?"Business Development Fee Invoice":""}
       {location.state && location.state.name==='technical'?"Technical Consultation":""}
       {location.state && location.state.name==='basic'?"Basic Templates":""}
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
              placeholder="Your Company Name"
              onChange={(e) => setComp_name(e.target.value)}
            />

            {/* location.state && location.state.name==='mentoring' */}
          { location.state && location.state.name==='reference'
          ?
          "":
          <div className="flex flex-col gap-3">
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="Company's Address"
              onChange={(e) => setComp_add(e.target.value)}
            />
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="ZipCode"
              onChange={(e) => setzip(e.target.value)}
            />
            <input
              className="w-[45%] p-1 rounded-md"
              type="text"
              placeholder="Contact Number"
              onChange={(e) => setContactNo(e.target.value)}
            />
            <input
              className="w-[45%] p-1 rounded-md"
              type="email"
              placeholder="Your Company's Email Id"
              onChange={(e) => setComp_email(e.target.value)}
            />
            <div id="countryFlag" className="flex item-center w-[70%]">
              <div className="red w-[100%]">
                <Select
                  className="w-[65%]"
                  isSearchable={true}
                  options={options}
                  //   value={value}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
            </div>
            
          }
            

            
          </div>
          <div className="pr-[100px]  text-[35px] font-[600] mt-[60px]">
            INVOICE
          </div>
        </div>
        <br />
        <br />
        <div className="flex ml-[60px] w-[100%] justify-between">
          <div className="flex flex-col gap-3 w-[85%] ">
            <div className="flex gap-1 ">
              <label className="mt-1">Bill To:</label>
              <input
                type="text"
                placeholder="Client Name"
                className="w-[50%] p-1 rounded-md"
                onChange={(e) => setClient_name(e.target.value)}
              />
            </div>
            <input
              className="w-[63%] p-1 rounded-md"
              type="text"
              placeholder="Client Company Name"
              onChange={(e) => setClient_comp_name(e.target.value)}
            />
            <input
              className="w-[63%] p-1 rounded-md"
              type="text"
              placeholder="Client's Address"
              onChange={(e) => setClient_add(e.target.value)}
            />
            <input
              className="w-[63%] p-1 rounded-md"
              type="text"
              placeholder="Company's Address"
              onChange={(e) => setClient_comp_add(e.target.value)}
            />
            <input
              className="w-[63%] p-1 rounded-md"
              type="text"
              placeholder="City"
              onChange={(e) => setClient_city(e.target.value)}
            />
            <input
              className="w-[63%] p-1 rounded-md"
              type="text"
              placeholder="State"
              onChange={(e) => setClient_state(e.target.value)}
            />
            <input
              className="w-[63%] p-1 rounded-md"
              type="text"
              placeholder="ZipCode"
              onChange={(e) => setClient_zip(e.target.value)}
            />
            <input
              className="w-[63%] p-1 rounded-md"
              type="text"
              placeholder="Contact Number"
              onChange={(e) => setClient_contact_no(e.target.value)}
            />
            <input
              className="w-[63%] p-1 rounded-md"
              type="email"
              placeholder="Client's Email Id"
              onChange={(e) => setClient_email(e.target.value)}
            />

            <div id="countryFlag" className="flex item-center w-[70%]">
              <div className="red w-[100%]">
                <Select
                  className="w-[65%]"
                  isSearchable={true}
                  options={options}
                  //   value={value}
                  onChange={(e) => setClient_country(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-[100%]">
            <div className="flex justify-between w-[100%] pr-[180px]">
              <label className="mt-1">Invoice No. :</label>
              <input
                type="text"
                placeholder="#"
                className="w-[60%] p-1 rounded-md"
                onChange={(e) => setInvoiceNo(e.target.value)}
              />
            </div>

            <div className="flex justify-between  w-[100%] pr-[180px]">
              <label className="mt-1">Invoice date:</label>
              <input
                type="date"
                placeholder="Name"
                className="w-[60%] p-1 rounded-md"
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>

            <div className="flex justify-between  w-[100%] pr-[180px]">
              <label className="mt-1">Invoice Total:</label>
              <input
                type="number"
                placeholder="Total"
                className="w-[60%] p-1 rounded-md"
                onChange={(e) => setInvoiceTotal(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <table class="ml-[60px] mt-[30px] table-auto w-[88%] ">
            <thead className="dark:bg-gray-900 text-gray-300 font-[100]">
              <tr>
                <th className="text-left p-2">Description</th>
                {location.state && location.state.name === "technical" ? (
                  <th className="text-left">Hours</th>
                ) : (
                  <th className="text-left">Quantity</th>
                )}
                <th className="text-left">Rate</th>
                <th className="text-left">Amount</th>
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
     focus:bg-gray-200 rounded-sm"
                      placeholder={
                        location.state && location.state.name === "technical"
                          ? "Hours"
                          : "Quantity"
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      className="w-[45%] bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      focus:bg-gray-200 rounded-sm
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
        <div className="text-right mr-[45px] text-[18px] flex flex-col gap-2">
          <div>
            <span className="text-left text-gray-700 font-[700]">Subtotal:</span>
            <input
                      type="number"
                      className="w-[10%] ml-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      focus:bg-gray-200 rounded-sm
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="subtotal"
                    />
          </div>
          <div>
            <span className="justify-left text-gray-700 font-[700]">Tax: </span>
            <input
                      type="number"
                      className="w-[10%] ml-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      focus:bg-gray-200 rounded-sm
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="tax"
                    />
          </div>
          <div>
            <span className="text-gray-500 text-gray-700 font-[700]">Total: </span>
            <input
                      type="number"
                      className="w-[10%] ml-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      focus:bg-gray-200 rounded-sm
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="total"
                    />
          </div>
        </div>

        <hr class="w-[88%] ml-[60px] h-0.5 bg-gray-100 border-0 border-dashed rounded md:my-10 dark:bg-gray-300"></hr>

        <div className="flex flex-col ml-[60px]">
          <div className="font-bold text-[18px]">Terms & Conditions</div>
          <div className="mt-2 flex flex-col w-[400px] gap-3">
            <div className="flex  justify-between">
              <div>Payment Terms:</div>
              <textarea
                placeholder="Accepted Payment Terms"
                className="pl-2 w-[230px] rounded-md"
              />
            </div>
            <div className="flex">
              <div>Due Date:</div>
              <input
                type="date"
                placeholder="Name"
                className="w-[35%] ml-[95px] p-1 rounded-md"
              />
            </div>
          </div>

          <div className="flex mt-5 gap-2">
            <div className="font-bold">
              Please make payment to the following bank account:
            </div>
            <Link to="/" className="underline">
              Link to account
            </Link>
          </div>
          <div className="mt-5 w-[90%] pb-5">
            Thank you for your business! If you have any questions or concerns
            about this invoice, please do not hesitate to contact us at the
            contact information provided above.
          </div>
          <div className="mt-4">Sincerely,</div>
          <input
            type="text"
            placeholder="Your Name"
            className=" w-[25%] mt-3 mb-5 focus:p-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:bg-gray-200 rounded-sm"
            //   className="w-[25%] mt-3 mb-5 p-2 rounded-md"
          />
          {location.state && location.state.name === "technical" || location.state.name === "business" ? (
            <input
              type="text"
              placeholder="Your Title"
              className=" w-[25%] mb-4 focus:p-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:bg-gray-200 rounded-sm"
            />
          ) : (
            ""
          )}
          {location.state && location.state.name === "technical" || location.state.name === "business" || location.state.name === "generic" ? (
            <input
              type="text"
              placeholder="Your Company"
              className=" w-[25%] mb-4 focus:p-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:bg-gray-200 rounded-sm"
            />
          ) : (
            ""
          )}
        </div>

      <div className="ml-[60px] pb-5 flex gap-3">
        <button className="bg-black rounded-md p-3 text-white hover:bg-gray-400 hover:text-black font-[700]">
          Generate Invoice
        </button>
        <button
          className="bg-black rounded-md p-3 text-white hover:bg-gray-400 hover:text-black font-[700]"
          onClick={handleSaveDraft}
        >
          Save Draft
        </button>
      </div>
    </div>
    </div>
  );
}

export default InvoicePage;
