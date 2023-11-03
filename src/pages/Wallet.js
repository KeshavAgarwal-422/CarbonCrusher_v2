import React from 'react';
import { IoWalletSharp } from 'react-icons/io5';



const Wallet = () => {
    return (
        <div className="w-full h-full pt-[40%]">
            <div className='flex justify-center text-[35vw]'>{<IoWalletSharp ></IoWalletSharp>}</div>
            <div className='mt-[10vw] text-[6vw] w-full text-center'>1080 Carbs</div>
            <div className='flex justify-center mt-[20vw] gap-[15vw]'>
                <button
                    className="bg-[#CFFF0F] px-[2vw] py-[2vw] text-[4vw] font-bold rounded-3xl text-black mt-[6vw]"
                >
                    Redeem Carbs
                </button>
                <button
                    className="bg-[#CFFF0F] px-[2vw] py-[2vw] text-[4vw] font-bold rounded-3xl text-black mt-[6vw]"
                >
                    Request Carbs
                </button>
            </div>

        </div>
    );
};

export default Wallet;
