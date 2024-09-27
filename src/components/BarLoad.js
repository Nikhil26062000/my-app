import React from 'react'
import { PuffLoader } from 'react-spinners'

const BarLoad = () => {
  return (
    <div className="w-full h-[100vh]  flex justify-center items-center ">
        <PuffLoader />
    </div>
  )
}

export default BarLoad