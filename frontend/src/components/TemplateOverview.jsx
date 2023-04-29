import React from "react";
import template from "./assests/template.png";
import { Link } from "react-router-dom";

const TemplateOverview = () => {
  return (
    <div className="  flex flex-wrap dark:bg-gray-900 ">
      <div className="align-center text-center pt-6 w-full font-bold text-[40px] dark:text-white">Templates</div>
      <div class="flex items-center justify-center flex-wrap pt-5">

        <card class="m-6 relative  h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all  text-gray-900 bg-white  border shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">
          <Link to='/pricingPage'>
          <img src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Mentoring Invoice</div>
          </div>
          </Link>
        </card>

        <card class="m-6 relative  h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all  text-gray-900 bg-white  border shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">
          <Link to='/pricingPage'>
          <img src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Generic Consulting Invoice </div>
          </div>
          </Link>
        </card>


        <card class="m-6 relative  h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all  text-gray-900 bg-white  border shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">
          <Link to='/pricingPage'>
          <img src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Reference Intoduction</div>
          </div>
          </Link>
        </card>

        <card class="m-6 relative  h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all  text-gray-900 bg-white  border shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">
          <Link to='/pricingPage'>
          <img src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Business Development Fee </div>
          </div>
          </Link>
        </card>

        <card class="m-6 relative  h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all  text-gray-900 bg-white  border shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">
          <Link to='/pricingPage'>
          <img src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Technical Consultation</div>
          </div>
          </Link>
        </card>

        <card class="m-6 relative  h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all  text-gray-900 bg-white  border shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">
          <Link to='/pricingPage'>
          <img src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 dark:bg-gray-800  opacity-90 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Basic Templates</div>
          </div>
          </Link>
        </card>

       



      </div>
    </div>
  );
};

export default TemplateOverview;
