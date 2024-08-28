import React from 'react'
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';

const AddPhoto = () => {
  return (
    <div>
        <button className="w-[111px] ml-auto flex justify-center items-center h-[47px] bg-[#125B57] gap-[8px] text-white rounded-[22px]">
                            <CameraEnhanceIcon className="!w-[25px] !h-[20px]"/>
                            <p className='font-inter font-[400] text-[12px] leading-[18px] tracking-[-2.3%] text-[#C8C8C8]'>Add Photo</p>
                    </button>
    </div>
  )
}

export default AddPhoto