import React from 'react'
import NotificationCard from '../Cards/NotificationCard';

const Notifications = () => {
    return (
        <><div className='w-[100vw]'>
            <h2 className='w-full text-[6vw] pl-[3vw] py-[1vw] text-left'>Notifications...</h2>
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
        </div></>
    )
}

export default Notifications;
