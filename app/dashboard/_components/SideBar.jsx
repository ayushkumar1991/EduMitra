'use client'

import Image from 'next/image'
import React from 'react'
import { FaHome } from "react-icons/fa";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

function SideBar() {
    const Menu = [
        {
            id: 1,
            name: "Home",
            icon: <FaHome />,
            path: "/dashboard"
        },
        {
            id: 2,
            name: "Explore",
            icon: <HiSquare3Stack3D />,
            path: "/dashboard/explore"
        },
        {
            id: 3,
            name: "Upgrade",
            icon: <IoShieldCheckmark />,
            path: "/dashboard/upgrade"
        },
        {
            id: 4,
            name: "Logout",
            icon: <IoIosLogOut />,
            path: "/dashboard/logout"
        }
    ];

    const path = usePathname();

    return (
        <div className='fixed h-full md:w-64 p-5 shadow-md'>
            <Image src={'/Edumitra.png'} width={90} height={90} alt="EduMitra Logo" />
            <hr className='my-5' />

            <ul>
                {Menu.map((item) => (
                    <Link key={item.id} href={item.path}> {/* ✅ Added key prop inside Link */}
                        <div className={`flex items-center gap-2 space-x-2 my-2 p-3 
                            cursor-pointer hover:bg-gray-200 hover:text-black rounded-lg
                            ${item.path === path ? 'bg-gray-200 text-black' : 'text-gray-500'}`}>
                            <div className='text-2xl'>{item.icon}</div>
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </ul>

            <div className='absolute bottom-10 w-[90%]'>
                <Progress value={33} />
                <h2 className='text-sm my-2'> 3 Out of 5 Courses Created</h2>
                <h2 className='text-xs text-gray-500'>Upgrade your Plan for unlimited course creation</h2>
            </div>
        </div>
    )
}

export default SideBar;
