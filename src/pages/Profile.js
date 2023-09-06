import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { useStateContext } from "../Context";



const Profile = () => {
    const nav = useNavigate();
    const { user, setIsLoggedIn, handleUserSearch } = useStateContext();

    const handleSignOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('phoneNumber');
        nav("/");
    };

    useEffect(() => {
        Object.keys(user).length === 0 ? handleUserSearch() : null;
    }, [])

    return (
        <div className="w-full h-full pt-[10vw]">
            <div className='flex justify-center text-[27vw]'>{<CgProfile ></CgProfile>}</div>
            <div className="flex flex-col ml-[10vw] mt-[5vw] text-[4vw]">
                <h3><span >Full Name:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">{user?.name}</span></h3>
                <h3><span className="mt-[6vw]">Mobile No:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">{user?.phoneNumber}</span></h3>
                <h3><span className="mt-[6vw]">Email:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">{user?.email}</span></h3>
                <h3><span className="mt-[6vw]">Gender:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">{user?.gender}</span></h3>
                <h3><span className="mt-[6vw]">Age:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">{user?.age}</span></h3>
                <h3><span className="mt-[6vw]">Wallet Amount:</span>
                    <span className="ml-[2vw] text-[#CFFF0F]">{user?.walletAmount} Carbs</span></h3>

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
