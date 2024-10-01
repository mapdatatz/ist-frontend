import React from 'react'
import { LuSearchSlash } from 'react-icons/lu'

export default function NoResult({title}: any) {
  return (
    <div className="flex flex-col justify-center items-center py-10">
    <div>
      <LuSearchSlash color={"#D2D2D2"} size={40} />
    </div>
    <div className="text-gray-400">{title}</div>
  </div>
  )
}
