import React from 'react'

const Navbar = ({isForum}) => {
  return (
    <div className='w-[197px] h-[22px] flex justify-center gap-[90px] list-none'>
       
           <li className={`font-inter font-[400] text-[18px] leading-[21.78px] text-[#125B57] ${isForum ? 'underline' : ''}`}>Forum</li>
           <li className={`font-inter font-[400] text-[18px] leading-[21.78px] text-[#125B57] ${isForum ? '' : 'underline'}`}>Chats</li>

       
    </div>
  )
}

export default Navbar