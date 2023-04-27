import React from "react";
import template from "./assests/template.png";
import { Link } from "react-router-dom";

const TemplateOverview = () => {
  return (
    <div className="m-auto border flex flex-wrap ">
      <div className="align-center text-center pt-6 w-full font-bold text-[40px]">Templates</div>
      <div class="h-screen flex items-center justify-center flex-wrap ">

        <card class="m-3 relative h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all shadow-md">
          <Link to='/invoicePage'>
          <img alt="" src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 bg-black opacity-60 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Mentoring Invoice</div>
          </div>
          </Link>
        </card>

        <card class="m-3 relative h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all shadow-md">
          <Link to='/invoicePage'>
          <img alt="" src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 bg-black opacity-60 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Generic Consulting Invoice</div>
          </div>
          </Link>
        </card>


        <card class="m-3 relative h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all shadow-md">
          <Link to='/pricingPage'>
          <img alt="" src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 bg-black opacity-60 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Reference Introduction</div>
          </div>
          </Link>
        </card>


        <card class="m-3 relative h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all shadow-md">
          <Link to='/pricingPage'>
          <img src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 bg-black opacity-60 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Business Development Fee</div>
          </div>
          </Link>
        </card>

        <card class="m-3 relative h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all shadow-md">
          <Link to='/pricingPage'>
          <img src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 bg-black opacity-60 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Technical Consultation</div>
          </div>
          </Link>
        </card>

        <card class="m-3 relative h-[20rem] w-[25rem] rounded-lg hover:scale-105 transition-all shadow-md">
          <Link to='/pricingPage'>
          <img src={template} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 bg-black opacity-60 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-white font-bold text-[30px] w-[50%]">Basic Template</div>
          </div>
          </Link>
        </card>



      </div>
    </div>
  );
};

export default TemplateOverview;
