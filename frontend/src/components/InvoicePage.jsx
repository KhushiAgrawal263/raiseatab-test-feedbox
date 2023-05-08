import React, { useEffect, useState } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function InvoicePage() {
  const location = useLocation();
  console.log(location);
  const [options, setOptions] = useState(countryList().getData());
  const [value, setValue] = useState("");

  console.log(countryList().getData());
  const [imgg, setImgg] = useState(false);
  const [file, setFile] = useState("");
  const [rows, setRows] = useState([]);
  const [image, setImage] = useState(false);
  const [user, setUser] = useState();

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
  const [logoId, setLogoId] = useState();

  const [paymentTerm, setPaymentTerm] = useState("");
  const [dueDate, setDueDate] = useState(false);
  const [yourName, setYourName] = useState("");

  const [items, setItems] = useState([]);

  const [greetingName, setGreetingName] = useState(false);
  const [yourTitle,setYourTitle]=useState(false);
  const [yourCompany,setYourCompany]=useState(false);

  const jwt = localStorage.getItem("invoiceJWT");
  const url = process.env.REACT_APP_URL;

  useEffect(() => {
    const getUser = async () => {
      const data = await fetch(`${process.env.REACT_APP_URL}/getUser`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const res = await data.json();
      console.log(res[0]);
      setUser(res[0]);
      setFile(`https://drive.google.com/uc?id=${res[0].logo}`);
      setComp_name(res[0].companyName);
      setComp_add(res[0].companyAddress);
      setCity(res[0].city);
      setState(res[0].state);
      setzip(res[0].zipcode);
      setComp_email(res[0].email);
      setContactNo(res[0].phoneNo);
      setCountry(res[0].country);
      setImage(true);
      setLogoId(res[0].logo);
    };
    getUser();
  }, []);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImgg(e.target.files[0]);
    setImage(!image);
  }

  const crossImage = () => {
    setImage(false);
    setImgg(false);
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

  const handleDeleteRow = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
    console.log(rows);
  };

  const handleSaveDraft = async () => {
    console.log(imgg);
    let formData = new FormData();
    if (imgg) formData.append("logo", imgg);
    if (comp_name) formData.append("companyName", comp_name);
    if (compAdd) formData.append("companyAddress", compAdd);
    if (city) formData.append("city", city);
    if (state) formData.append("state", state);
    if (zip) formData.append("zipcode", zip);
    if (country) formData.append("country", country);
    if (comp_email) formData.append("email", comp_email);
    if (contactNo) formData.append("phoneNo", contactNo);
    if (logoId) formData.append("logoId", logoId);

    // const data = await fetch(`${url}/update/user/invoice/${user.user_id}`, {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    // });
    // const res = await data.json();

    const val = {
      invoice_id: invoiceNo,
      invoiceDate: invoiceDate,
      invoiceTotal: invoiceTotal,
      client_name: client_name,
      client_comp_name: client_comp_name,
      client_add: clientAdd,
      client_comp_add: client_comp_add,
      client_city: client_city,
      client_state: client_state,
      client_zip: client_zip,
      client_contactNo: client_contact_no,
      client_email: client_email,
      client_country: client_country,
      subTotal: subTotal,
      tax: tax,
      total: total,
      dueDate: dueDate,
      yourName: yourName,
    };

    const newData = await fetch(
      `${url}/set/invoice/draft/${location.state.name}`,
      {
        method: "POST",
        body: JSON.stringify(val),
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    const newRes = await newData.json();
  };

  const changeHandler = (e) => {
    setCountry(e.label);
  };

  const changeClientCountry = (e) => {
    setClient_country(e.label);
  };

  const handleEmail = async (id, pdf) => {
    const formData = new FormData();
    formData.append("pdf", pdf);
    const data = await fetch(`http://localhost:8000/sendmail/${id}`, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/json" },
    });
    const res = await data.json();
    console.log("Mail sent", res);
  };

  const createPDF = async (id) => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#pdf"));
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    console.log(data);
    console.log(pdf);
    // pdf.save("Invoice.pdf");
    console.log(pdf.save("Invoice.pdf"));
    // setPdf(pdf.save("Invoice.pdf"));
    console.log(pdf);
    handleEmail(id, pdf);
  };

  return (
    <div className="dark:bg-gray-900 pb-[50px]">
      <div className="text-white text-center p-6 font-[700] text-[27px] text-gray-300">
        {location.state && location.state.name === "mentoring"
          ? "Mentoring Invoice"
          : ""}
        {location.state && location.state.name === "generic"
          ? "Generic Consulting Invoice"
          : ""}
        {location.state && location.state.name === "reference"
          ? "Reference Introduction"
          : ""}
        {location.state && location.state.name === "business"
          ? "Business Development Fee Invoice"
          : ""}
        {location.state && location.state.name === "technical"
          ? "Technical Consultation"
          : ""}
        {location.state && location.state.name === "basic"
          ? "Basic Templates"
          : ""}
      </div>
      <div className="flex gap-[80px] ml-[70px] mt-5 mr-[70px]">
        {/* left div  */}
        <div className="bg-gray-100 w-[50%]">
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
                    className="relative cursor-pointer bg-gray-300 rounded-md font-medium w-[65%] border-dashed border-2 border-gray-400 text-gray-500 "
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
                className="w-[65%] p-1 rounded-md"
                type="text"
                // value={user && user.name}
                // value="fghfvhfa"
                // value={comp_name}
                placeholder="Your Company Name"
                onChange={(e) => setComp_name(e.target.value)}
              />

              {location.state && location.state.name === "reference" ? (
                ""
              ) : (
                <div className="flex flex-col gap-3">
                  <input
                    className="w-[65%] p-1 rounded-md"
                    type="text"
                    // value={compAdd}
                    placeholder="Company's Address"
                    onChange={(e) => setComp_add(e.target.value)}
                  />
                  <input
                    className="w-[65%] p-1 rounded-md"
                    type="text"
                    placeholder="City"
                    // value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    className="w-[65%] p-1 rounded-md"
                    type="text"
                    placeholder="State"
                    // value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  <input
                    className="w-[65%] p-1 rounded-md"
                    type="number"
                    placeholder="ZipCode"
                    // value={zip}
                    onChange={(e) => setzip(e.target.value)}
                  />
                  <input
                    className="w-[65%] p-1 rounded-md"
                    type="number"
                    placeholder="Contact Number"
                    // value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                  <input
                    className="w-[65%] p-1 rounded-md"
                    type="email"
                    placeholder="Company's Email Id"
                    // value={comp_email}
                    onChange={(e) => setComp_email(e.target.value)}
                  />
                  <div id="countryFlag" className="flex item-center w-[100%]">
                    <div className="red w-[100%]">
                      {/* <select
                        className="w-[65%]"
                        isSearchable={true}
                        options={options}
                        onChange={(e) => setCountry(e.target.value)} */}
                      <Select
                        className="w-[65%]"
                        isSearchable={true}
                        options={options}
                        defaultValue={country}
                        value={user && user.country}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>
              )}
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
                className="w-[68%] p-1 rounded-md"
                type="text"
                placeholder="Client Company Name"
                onChange={(e) => setClient_comp_name(e.target.value)}
              />
              <input
                className="w-[68%] p-1 rounded-md"
                type="text"
                placeholder="Client's Address"
                onChange={(e) => setClient_add(e.target.value)}
              />
              <input
                className="w-[68%] p-1 rounded-md"
                type="text"
                placeholder="Company's Address"
                onChange={(e) => setClient_comp_add(e.target.value)}
              />
              <input
                className="w-[68%] p-1 rounded-md"
                type="text"
                placeholder="City"
                onChange={(e) => setClient_city(e.target.value)}
              />
              <input
                className="w-[68%] p-1 rounded-md"
                type="text"
                placeholder="State"
                onChange={(e) => setClient_state(e.target.value)}
              />
              <input
                className="w-[68%] p-1 rounded-md"
                type="number"
                placeholder="ZipCode"
                onChange={(e) => setClient_zip(e.target.value)}
              />
              <input
                className="w-[68%] p-1 rounded-md"
                type="number"
                placeholder="Contact Number"
                onChange={(e) => setClient_contact_no(e.target.value)}
              />
              <input
                className="w-[68%] p-1 rounded-md"
                type="email"
                placeholder="Client's Email Id"
                onChange={(e) => setClient_email(e.target.value)}
              />

              <div id="countryFlag" className="flex item-center w-[105%]">
                <div className="red w-[100%]">
                  <Select
                    className="w-[65%]"
                    isSearchable={true}
                    options={options}
                    //   value={value}
                    // onChange={(e) => setClient_country(e.target.value)}
                    onChange={changeClientCountry}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-[100%]">
              <div className="flex justify-between w-[100%] pr-[120px]">
                <label className="mt-1">Invoice No. :</label>
                <input
                  type="text"
                  placeholder="#"
                  className="w-[50%] p-1 rounded-md"
                  onChange={(e) => setInvoiceNo(e.target.value)}
                />
              </div>

              <div className="flex justify-between  w-[100%] pr-[120px]">
                <label className="mt-1">Invoice date:</label>
                <input
                  type="date"
                  placeholder="Name"
                  className="w-[50%] p-1 rounded-md"
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </div>

              <div className="flex justify-between  w-[100%] pr-[120px]">
                <label className="mt-1">Invoice Total:</label>
                <input
                  type="number"
                  placeholder="Total"
                  className="w-[50%] p-1 rounded-md"
                  onChange={(e) => setInvoiceTotal(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <table class="ml-[60px] mt-[30px] table-auto w-[86%] ">
              <thead className="dark:bg-gray-900 text-gray-300 font-[100]">
                <tr>
                  <th className="text-left p-2">Description</th>
                  {location.state && location.state.name === "technical" ? (
                    <th className="text-left">Hours</th>
                  ) : (
                    <th className="text-left">Quantity</th>
                  )}
                  <th className="text-left">Rate</th>
                  <th className="text-left p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((rows) => (
                  <tr key={rows.id} class="border-b border-gray-400">
                    <td className="p-2">
                      <textarea
                        placeholder="Enter Item Name"
                        className="w-[140px] bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        focus:bg-gray-200 pl-2 rounded-sm"
                        value={rows.description}
                        onChange={(e) =>
                          handleInputChange(
                            rows.id,
                            "description",
                            e.target.value
                          )
                        }
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
                        value={rows.quantity}
                        onChange={(e) =>
                          handleInputChange(rows.id, "quantity", e.target.value)
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
                        name="price"
                        onChange={(e) => handleInputChange(rows.id,"price",e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                      type="number"
                      placeholder="amount"
                        
                        className="w-[105%] bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        focus:bg-gray-200 rounded-sm
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        onChange={(e) => handleInputChange(rows.id,"subamount",e.target.value)}
                      >
                      </input>
                    </td>
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
          <div className="text-right mr-[45px] text-[16px] flex flex-col gap-2">
            <div>
              <span className="text-left text-gray-700 font-[700]">
                Subtotal:
              </span>
              <input
                type="number"
                className="w-[10%] focus:pl-1 ml-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                focus:bg-gray-200 rounded-sm
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="subtotal"
                onChange={(e) => setSubTotal(e.target.value)}
              />
            </div>
            <div>
              <span className="justify-left text-gray-700 font-[700]">
                Tax:{" "}
              </span>
              <input
                type="number"
                className="w-[10%] focus:pl-1 ml-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                 focus:bg-gray-200 rounded-sm
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="tax"
                onChange={(e) => setTax(e.target.value)}
              />
            </div>
            <div>
              <span className="text-gray-500 focus:pl-2 text-gray-700 font-[700]">
                Total:{" "}
              </span>
              <input
                type="number"
                className="w-[10%] ml-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                focus:bg-gray-200 rounded-sm
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="total"
                onChange={(e) => setTotal(e.target.value)}
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
                  onChange={(e) => setPaymentTerm(e.target.value)}
                />
              </div>
              <div className="flex">
                <div>Due Date:</div>
                <input
                  type="date"
                  placeholder="Name"
                  className="w-[35%] ml-[95px] p-1 rounded-md"
                  onChange={(e) => setDueDate(e.target.value)}
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
              onChange={(e) => setGreetingName(e.target.value)}
            />
            {(location.state && location.state.name === "technical") ||
            location.state.name === "business" ? (
              <input
                type="text"
                placeholder="Your Title"
                className=" w-[25%] mb-4 focus:p-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:bg-gray-200 rounded-sm"
                onChange={(e) => setYourTitle(e.target.value)}
              />
            ) : (
              ""
            )}
            {(location.state && location.state.name === "technical") ||
            location.state.name === "business" ||
            location.state.name === "generic" ? (
              <input
                type="text"
                placeholder="Your Company"
                className=" w-[25%] mb-4 focus:p-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:bg-gray-200 rounded-sm"
                onChange={(e) => setYourCompany(e.target.value)}
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


        {/* Right div */}
        <div className="bg-gray-100 w-[50%] h-fit pb-5">
          <div className="flex">
            <div className="flex flex-col p-5 ml-[40px] mt-[30px] gap-3 w-[100%] ">
              <div>
                {
                  image?<img
                  className="w-[150px] h-[150px] -mt-[35px] object-cover"
                  src={file}
                  alt=""
                />:(<div className="mb-3"></div>)
                }
                
              </div>

              <div className="flex justify-between w-[100%] ">
                <label className="w-[40%]">company Name:</label>
                <div className="w-[80%]  rounded-md">{comp_name}</div>
              </div>
              {location.state && location.state.name === "reference" ? (
                ""
              ) : (
              <>
              <div className="flex justify-between w-[100%] ">
                <label className="w-[40%]">Address:</label>
                <div className="w-[80%]  rounded-md">{compAdd}</div>
              </div>

              <div className="flex justify-between w-[100%] ">
                <label className="w-[40%]">City:</label>
                <div className="w-[80%] rounded-md">{city}</div>
              </div>

              <div className="flex justify-between w-[100%] ">
                <label className="w-[40%]">State:</label>
                <div className="w-[80%]  rounded-md">{state}</div>
              </div>

              <div className="flex justify-between w-[100%] ">
                <label className="w-[40%]">Zip Code:</label>
                <div className="w-[80%]  rounded-md">{zip}</div>
              </div>

              <div className="flex justify-between w-[100%] ">
                <label className="w-[40%]">Number:</label>
                <div className="w-[80%]  rounded-md">{contactNo}</div>
              </div>
              <div className="flex justify-between w-[100%] ">
                <label className="w-[40%]">Email:</label>
                <div className="w-[80%] p-1 rounded-md">{comp_email}</div>
              </div>

              <div className="flex justify-between w-[100%] ">
                <label className="w-[40%]">Country:</label>
                <div className="w-[80%] p-1 rounded-md">{country}</div>
              </div>
              </>
            )}
            </div>
            
            <div className="pr-[50px]  text-[35px] font-[600] mt-[60px]">
              INVOICE
            </div>
          </div>
          <div className="flex ml-[60px] w-[100%] justify-between">
            <div className="flex flex-col gap-3 w-[85%] ">
              <div className="flex gap-1 ">
                <label className="mt-1">Bill To:</label>
                <div className="w-[50%] p-1 pb-0 rounded-md">{client_name}</div>
              </div>
              <div className="flex gap-1 ">
                <label className="mt-1">Company Name:</label>
                <div className="w-[50%] p-1 pb-0 rounded-md">
                  {client_comp_name}
                </div>
              </div>
              <div className="flex gap-1 ">
                <label className="mt-1">Client Address:</label>
                <div className="w-[50%] p-1 pb-0 rounded-md">{clientAdd}</div>
              </div>
              <div className="flex gap-1 ">
                <label className="mt-1">Company Address:</label>
                <div className="w-[50%] p-1 pb-0 rounded-md">
                  {client_comp_add}
                </div>
              </div>
              <div className="flex gap-1 ">
                <label className="mt-1">City:</label>
                <div className="w-[50%] p-1 pb-0 rounded-md">{client_city}</div>
              </div>
              <div className="flex gap-1 ">
                <label className="mt-1">State:</label>
                <div className="w-[50%] p-1 pb-0 rounded-md">
                  {client_state}
                </div>
              </div>
              <div className="flex gap-1 ">
                <label className="mt-1">Zip Code:</label>
                <div className="w-[50%] p-1 pb-0 rounded-md">{client_zip}</div>
              </div>
              <div className="flex gap-1 ">
                <label className="mt-1">Contact No.:</label>
                <div className="w-[50%] p-1 pb-0 rounded-md">
                  {client_contact_no}
                </div>
              </div>
              <div className="flex gap-1 ">
                <label className="mt-1">Email:</label>
                <div className="w-[50%] p-1 pb-0 rounded-md">
                  {client_email}
                </div>
              </div>
              <div className="flex gap-1 ">
                <label className="mt-1">Country:</label>
                <div className="w-[50%] p-1 pb-0 rounded-md">
                  {client_country}
                </div>
              </div>
            </div>

            <div className="flex flex-col  w-[100%]">
              <div className="flex justify-between w-[100%] pr-[120px]">
                <label className="mt-1">Invoice No. :</label>
                <div className="w-[50%] p-1 rounded-md">{invoiceNo}</div>
              </div>

              <div className="flex justify-between  w-[100%] pr-[120px]">
                <label className="mt-1">Invoice date:</label>
                <div className="w-[50%] p-1 rounded-md">{invoiceDate}</div>
              </div>

              <div className="flex justify-between  w-[100%] pr-[120px]">
                <label className="mt-1">Invoice Total:</label>
                <div className="w-[50%] p-1 rounded-md">{invoiceTotal}</div>
              </div>
            </div>
          </div>

          <div>
            <table class="ml-[60px] mt-[30px] table-auto w-[86%] ">
              <thead className="dark:bg-gray-900 text-gray-300 font-[100]">
                <tr>
                  <th className="text-left p-2">Description</th>
                  {location.state && location.state.name === "technical" ? (
                    <th className="text-left">Hours</th>
                  ) : (
                    <th className="text-left">Quantity</th>
                  )}
                  <th className="text-left">Rate</th>
                  <th className="text-left p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((rows) => (
                  <tr key={rows.id} class="border-b border-gray-400">
                    <td className="p-2 w-[300px]">
                      <div>{rows.description}</div>
                    </td>

                    <td className="p-2 w-[60px]">
                      {/* <div> */}
                      {rows.quantity}
                      {/* </div> */}
                    </td>
                    <td className="p-2 w-[80px]">{rows.price}</td>
                    <td className="p-2">{rows.subamount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          

          <hr class="w-[88%] mt-4  ml-[60px] h-0.5 bg-gray-100 border-0 border-dashed rounded md:my-10 dark:bg-gray-300"></hr>
          <div className="text-right mr-[45px] text-[16px] flex flex-col gap-2">
            <div>
              <span className="text-left text-gray-700 font-[700]">
                Subtotal:
              </span>

              <span
                className="w-[10%] focus:pl-1 ml-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    focus:bg-gray-200 rounded-sm
                    text-left
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              >
                {subTotal}
              </span>
            </div>
            <span>
              <span className="justify-left text-gray-700 font-[700]">
                Tax:{" "}
              </span>
              <span
                className="w-[10%] focus:pl-1 ml-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  focus:bg-gray-200 rounded-sm 
                  text-left
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              >
                {tax}
              </span>
            </span>
            <span>
              <span className="text-gray-500 focus:pl-2 text-gray-700 font-[700]">
                Total:{" "}
              </span>
              <span
                className="w-[10%] ml-2 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  focus:bg-gray-200 rounded-sm
                   text-left
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              >
                {total}
              </span>
            </span>
          </div>

          <hr class="w-[88%] ml-[60px] h-0.5 bg-gray-100 border-0 border-dashed rounded md:my-10 dark:bg-gray-300"></hr>

          <div className="flex flex-col ml-[60px]">
            <div className="font-bold text-[18px] w-[20vw]">
              Terms & Conditions
            </div>
            <div className="mt-2 flex flex-col w-[500px] gap-3">
              <div className="flex  justify-between">
                <div className="w-[120px] rounded-md">Payment Terms:</div>
                <div className="w-[375px]">{paymentTerm}</div>
              </div>
              <div className="flex">
                <div>Due Date:</div>
                <div className="w-[35%] ml-3">{dueDate}</div>
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
            <div className="mt-5 w-[90%] pb-5">{greetingName}</div>

            {(location.state && location.state.name === "technical") ||
            location.state.name === "business" ? (
              <div className="flex gap-1 ">
                {/* <label className="mt-1">Country:</label> */}
                <div className="w-[50%] p-1 pb-0 rounded-md">
                  {yourTitle}
                </div>
              </div>
            ) : (
              ""
            )}
            {(location.state && location.state.name === "technical") ||
            location.state.name === "business" ||
            location.state.name === "generic" ? (
              <div className="flex gap-1 ">
                {/* <label className="mt-1">Country:</label> */}
                <div className="w-[50%] p-1 pb-0 rounded-md">
                  {yourCompany}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
