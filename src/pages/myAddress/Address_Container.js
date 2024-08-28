import React, { useState } from "react";

import AddressInput from "./AddressInput";

const Address_Container = () => {
  

  return (
    <main className=" mt-[28px] mx-auto flex flex-col gap-[18px] w-full pb-5">
      <p className="font-[600] text-[#125B57] text-[24px] leading-[26.4px]">
        Add a new address
      </p>
      <section className="flex flex-col gap-[18px]">
       

      
   <AddressInput html_for="Flat, House no., Building, Company" input_type="text" placeholderValue={false} />
   <AddressInput html_for="Area, Street, Sector, Village" input_type="text" placeholderValue={false}/>
   <AddressInput html_for="Landmark" input_type="text" placeholderValue={false}/>
   <AddressInput html_for="6-digit pincode" input_type="number" placeholderValue={true}/>
   <AddressInput html_for="Mobile No." input_type="number" placeholderValue={false}/>
 
      </section>
    </main>
  );
};

export default Address_Container;
