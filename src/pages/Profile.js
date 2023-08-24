import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';


const Profile = () => {
    const nav = useNavigate();
    const handleSignOut = () => {
        // Perform sign-out logic here
        // For now, we'll just navigate to the home page
        nav("/");
    };

    return (
        <div className="w-full h-full pt-[10vw]">
            <div className='flex justify-center text-[27vw]'>{<CgProfile ></CgProfile>}</div>
            <div className="flex flex-col ml-[10vw] mt-[5vw] text-[4vw]">
                <h3><span >Full Name:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">Jon Doe</span></h3>
                <h3><span className="mt-[6vw]">Mobile No:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">+1 234 567 890</span></h3>
                <h3><span className="mt-[6vw]">Email:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">jondoe@gmail.com</span></h3>
                <h3><span className="mt-[6vw]">Gender:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">Male</span></h3>
                <h3><span className="mt-[6vw]">Age:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">22</span></h3>
                <h3><span className="mt-[6vw]">Wallet Amount:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">22 Carb</span></h3>


            </div>

            <div className='flex justify-center mt-[5vw]'><button
                onClick={handleSignOut}
                className="bg-[#CFFF0F] px-[2vw] py-[2vw] text-[4vw] font-bold rounded-3xl text-black mt-[6vw]"
            >
                Sign Out
            </button></div>

        </div>
    );
};

export default Profile;
