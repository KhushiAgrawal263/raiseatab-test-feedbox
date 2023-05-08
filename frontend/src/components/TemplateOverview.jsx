import React, { useState } from "react";
import template from "./assests/template.png";
import { Link } from "react-router-dom";

const generateUniqueid = () => {
  let c3 = Math.floor(1000 + Math.random() * 9000);

  let result = '';
  for (let i = 0; i < 1; i++) {
   return result += c3;
  }

  console.log('unique id',result);
  
}

const TemplateOverview = () => {
  const [uniqueId, setUniqueId] = useState(generateUniqueid());


  return (
    <div className="  flex flex-wrap dark:bg-gray-900 ">
      <div className="align-center text-center pt-6 w-full font-bold text-[40px] dark:text-white">Templates</div>
      <div class="flex items-center justify-center flex-wrap pt-5">

        <card class="m-3 relative h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all shadow-md">
          {/* <Link 
            to='/invoicePage' state={{name:"mentoring",id:{generateUniqueid}}}> */}
            <Link to={`/invoicePage/${uniqueId}`} state={{name:"mentoring"}}>
          <img alt="" src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Mentoring Invoice</div>
          </div>
          </Link>
        </card>

        <card class="m-3 relative h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all shadow-md">
          <Link to={`/invoicePage/${uniqueId}`} state={{name:"generic"}} onClick={generateUniqueid}>
          <img alt="" src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Generic Consulting Invoice</div>
          </div>
          </Link>
        </card>

        <card class="m-6 relative  h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all  text-gray-900 bg-white  border shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">
          <Link to={`/invoicePage/${uniqueId}`} state={{name:"reference"}} onClick={generateUniqueid}>
          <img alt="" src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Reference Introduction</div>
          </div>
          </Link>
        </card>

        <card class="m-6 relative  h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all  text-gray-900 bg-white  border shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">
          <Link to={`/invoicePage/${uniqueId}`} state={{name:"business"}} onClick={generateUniqueid}>
          <img alt="" src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Business Development Fee </div>
          </div>
          </Link>
        </card>

        <card class="m-6 relative  h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all  text-gray-900 bg-white  border shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">
          <Link to={`/invoicePage/${uniqueId}`} state={{name:"technical"}} onClick={generateUniqueid}>
          <img alt="" src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Technical Consultation</div>
          </div>
          </Link>
        </card>

        <card class="m-6 relative  h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all  text-gray-900 bg-white  border shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">
          <Link to={`/invoicePage/${uniqueId}`} state={{name:"basic"}} onClick={generateUniqueid}>
          <img src={template} alt="" class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Basic Templates</div>
          </div>
          </Link>
        </card>
        {/* </form> */}
      </div>
    </div>
  );
};

export default TemplateOverview;
