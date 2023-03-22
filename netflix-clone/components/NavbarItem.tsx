import React from 'react'

type NavbarItemProps = {
    title: string,
    
}

const NavbarItem = ({title}: NavbarItemProps) => {
  return (
    <div className='text-white cursor-pointer hover:text-gray-300 items-center transition text-lg justify-center ml-2'>{title}</div>
  )
}

export default NavbarItem