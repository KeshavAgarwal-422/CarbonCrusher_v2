import React, { useEffect, useState } from 'react';
import { useStateContext } from "../Context";

const SensorComponent = () => {
    const { transportMode, setTransportMode } = useStateContext();
    const windowSize = 50;

    const [accelerometerData, setAccelerometerData] = useState({
        x: [],
        y: [],
        z: [],
    });
    const [hasRequestedPermission, setHasRequestedPermission] = useState(false);
    const [accessGranted, setAccessGranted] = useState(false);

    const requestMotionAccess = async () => {
        if (hasRequestedPermission) return;

        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            const permission = await DeviceMotionEvent.requestPermission();
            setHasRequestedPermission(true);
            if (permission === 'granted') {
                setAccessGranted(true);
            } else {
                console.warn("Permission was denied.");
            }
        } else {
            setAccessGranted(true);
        }
    };

    useEffect(() => {
        const handleDeviceMotion = (event) => {
            const { acceleration } = event;

            setAccelerometerData((prevData) => {
                const newData = {
                    x: [...prevData.x.slice(-windowSize + 1), acceleration?.x || 0],
                    y: [...prevData.y.slice(-windowSize + 1), acceleration?.y || 0],
                    z: [...prevData.z.slice(-windowSize + 1), acceleration?.z || 0],
                };
                return newData;
            });
        };

        if (accessGranted && window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', handleDeviceMotion, true);
        } else if (!window.DeviceMotionEvent) {
            console.log("DeviceMotionEvent is not supported on this device.");
        }

        return () => {
            window.removeEventListener('devicemotion', handleDeviceMotion, true);
        };
    }, [accessGranted]);

    useEffect(() => {
        const classifyTransportMode = (data) => {
            const maxAcceleration = Math.max(...data);

            if (maxAcceleration < 2) {
                return 'Still';
            }
            else if (maxAcceleration >= 2 && maxAcceleration < 5) {
                return 'Walking';
            }
            else if (maxAcceleration >= 5 && maxAcceleration < 10) {
                return 'Bike';
            }
            else if (maxAcceleration >= 10 && maxAcceleration < 20) {
                return 'Car';
            }
            else if (maxAcceleration >= 20) {
                return 'Train';
            }
            else {
                return 'Unknown';
            }

        };

        const allData = [...accelerometerData.x, ...accelerometerData.y, ...accelerometerData.z];
        const newTransportMode = classifyTransportMode(allData);
        setTransportMode(newTransportMode);
    }, [accelerometerData]);

    return (
        <div className='flex justify-center'>
            {!accessGranted && (
                <button
                    className="bg-[#CFFF0F] z-10 absolute top-[2vw] px-[2vw] py-[2vw] text-[4vw] font-medium rounded-3xl text-black"
                    onClick={requestMotionAccess}
                >
                    Request Motion Access
                </button>
            )}
        </div>
    );
};
export default SensorComponent;

