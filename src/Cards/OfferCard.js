import React from 'react'

const OfferCard = () => {
    return (
        <><div style={{ borderWidth: '2px', borderColor: '#CFFF0F', borderStyle: 'solid', borderRadius: "10px" }} className='flex flex-col items-center justify-between m-[4vw] px-[2vw] pb-[3vw] overflow-hidden bg-[#272727]'>
            <h1 className='text-[4vw] mb-[2vw] font-bold'>
                Exclusive Coupon
            </h1>
            <div className='w-full border-dashed border-[#CFFF0F]  mb-[2vw]'></div>
            <div className='flex items-center justify-between w-full'>
                <div className='text-[3vw] mb-[2vw]'>
                    <span>Coupon Code:</span>
                    <span className='font-bold ml-[1vw] text-[#CFFF0F]'>SAVE20</span>
                </div>
                <div className='text-[3vw] mb-[2vw]'>
                    <span>Discount:</span>
                    <span className='font-bold ml-[1vw] text-[#CFFF0F]'>20% OFF</span>
                </div>
            </div>
            <div className='w-full border-dashed border-[#CFFF0F]  mb-[3vw]'></div>
            <div className='flex items-center justify-between w-full'>
                <div className='text-[3vw] mb-[2vw]'>
                    <span>Expires on:</span>
                    <span className='font-bold ml-[1vw] text-[#CFFF0F]'>31/12/2023</span>
                </div>
                <div className='flex flex-col  mb-[1vw]'>
                    <button className='bg-[#CFFF0F] px-[3vw] py-[2vw] font-bold text-[3vw]  rounded-3xl text-black'>
                        Apply Coupon
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default OfferCard