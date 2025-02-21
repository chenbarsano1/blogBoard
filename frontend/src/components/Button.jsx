import React from 'react'

const Button = ({ children }) => {
  return (
    <button className="border-black cursor-pointer border-1 p-2 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]">
      {children}
    </button>
  )
}

export default Button
