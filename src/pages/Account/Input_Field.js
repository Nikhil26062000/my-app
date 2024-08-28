

import React, { useState } from 'react';

const Input_Field = ({ html_for, input_type }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <div className="w-full max-h-[72px] relative">
      <label
        htmlFor={html_for}
        className="font-medium text-[16px] leading-[16px] text-[#125B57]"
      >
        {html_for} <span className="text-red-500">*</span>
      </label>

      <input
        type={input_type}
        required
        id={html_for}
        name={html_for}
        placeholder={html_for}
        onFocus={() => setFocusedInput(html_for)}
        onBlur={() => setFocusedInput(null)}
        className={`w-full font-inter h-[48px] p-[12px] mt-1 placeholder-[#125B57] border-2 ${
          focusedInput === html_for ? 'border-[#125B57]' : 'border-[#125B57]'
        } bg-[#FAFAFA] box-border outline-none  text-[#125B57] font-[300] text-[16px] leading-[19.36px] tracking-[-2%]`}
      />
    </div>
  );
};

export default Input_Field;
