import React from 'react'

const Signup_Login_Header = ({heading,paragraph}) => {
  return (
    <div className="w-full max-h-[96px] flex flex-col gap-[13px]">
    <div className="h-[29px]">
         <h3 className="font-inter font-[500] text-[24px] leading-[29.05px] text-center text-[#000000]">{heading}</h3>
    </div>
    <div className='h-[54px]'>
          <p className="font-inter font-[400] text-[18px] leading-[21.78px] text-center text-[#000000]">{paragraph}</p>
    </div>


   
</div>
  )
}

export default Signup_Login_Header