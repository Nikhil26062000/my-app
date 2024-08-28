import React from 'react'

const PostButton = ({btn_name}) => {
  return (
    <div>
            <button className="font-inter w-full h-[56px] bg-[#125B57] text-white font-[500] text-[16px] leading-[19.36px] text-center rounded-[40px]"
    style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {btn_name}
    </button>
    </div>
  )
}

export default PostButton