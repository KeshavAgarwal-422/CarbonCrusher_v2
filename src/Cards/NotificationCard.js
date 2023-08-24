import React from 'react'
import { CgProfile } from 'react-icons/cg';


const NotificationCard = (data) => {
    return (
        <>
            <div style={{ borderWidth: '2px', borderColor: '#CFFF0F', borderStyle: 'solid', borderRadius: "10px" }} className='flex items-center justify-between m-[4vw] px-[2vw] pb-[3vw] overflow-hidden'>
                <div className='text-[10vw] h-full flex flex-col justify-center'>
                    <CgProfile />
                </div>
                <div className='flex flex-col justify-start ml-[5vw] flex-grow'>
                    <h1 className='text-[4vw] mb-[2vw]'>
                        <span>Jon Doe</span>
                        <span> is requesting you for </span>
                        <span>10</span>
                        <span> Carbs.</span>
                    </h1>
                    <div className='flex space-x-[2vw]'>
                        <button className='bg-[#CFFF0F] px-[2vw] py-[1vw] text-[3vw] font-medium rounded-3xl text-black'>
                            Accept
                        </button>
                        <button className='bg-red-600 px-[2vw] py-[1vw] text-[3vw] font-medium rounded-3xl '>
                            Decline
                        </button>
                    </div>
                </div>
            </div></>
    )
}

export default NotificationCard;