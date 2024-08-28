import React, { useState } from 'react'

const AddressInput = ({html_for,input_type,placeholderValue}) => {
    const [focusedInput, setFocusedInput] = useState(null);
  return (
  
         <div className="w-full  relative">
      <label
        htmlFor={html_for}
        className="font-medium text-[16px] leading-[16px] text-[#125B57]"
      >
        {placeholderValue ? "Pin code":html_for}
      </label>

      <input
        type={input_type}
        required
        id={html_for}
        name={html_for}
        placeholder={placeholderValue ? html_for : ''}
        onFocus={() => setFocusedInput(html_for)}
        onBlur={() => setFocusedInput(null)}
        className={`w-full  h-[48px] p-[12px] mt-1 border-2 ${
          focusedInput === html_for ? 'border-[#125B57]' : 'border-[#125B57]'
        } bg-[#FAFAFA] box-border outline-none  text-[#125B57] `}
      />
    </div>
   
  )
}

export default AddressInput