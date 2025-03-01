import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-md'>
    <Image
                   src="/Favicon.png"
                   alt="Favicon Logo"
                   width={90}
                   height={90}
               />
               <UserButton />

    </div>
  )
}

export default Header