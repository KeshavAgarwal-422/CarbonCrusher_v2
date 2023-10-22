import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { db } from "./config/firebase";
import {
  Timestamp,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [transportMode, setTransportMode] = useState("Still");
  const [user, setUser] = useState({});
  const [selectedDateObj, setSelectedDateObj] = useState(new Date());
  const storedPhoneNumber = localStorage.getItem("phoneNumber");
  const [transportActivities, setTransportActivities] = useState({
    Still: {
      carbonConsumption: 0,
      distance: 0,
      duration: 0,
    },
    Walking: {
      carbonConsumption: 0,
      distance: 0,
      duration: 0,
    },
    Bike: {
      carbonConsumption: 0,
      duration: 0,
      distance: 0,
    },
    Car: {
      distance: 0,
      duration: 0,
      carbonConsumption: 0,
    },
    Train: {
      carbonConsumption: 0,
      duration: 0,
      distance: 0,
    },
  });

  const speedConstants = {
    Still: 0,
    Walking: 0.5, // Units per second
    Bike: 2, // Units per second
    Car: 5, // Units per second
    Train: 10, // Units per second
  };

  const carbonEmissionConstants = {
    Still: 0,
    Walking: 0.01, // Units per second
    Bike: 0.05, // Units per second
    Car: 0.1, // Units per second
    Train: 0.2, // Units per second
  };

  const updateTransportData = () => {
    const currentActivity = transportActivities[transportMode];
    const now = new Date();

    if (currentActivity.timestamp) {
      const timeElapsed = (now - new Date(currentActivity.timestamp).getTime()) / 1000;
      const speed = speedConstants[transportMode];
      const carbonEmission = carbonEmissionConstants[transportMode];
      const newDistance = currentActivity.distance + speed * timeElapsed;
      const newCarbonEmission = currentActivity.carbonConsumption + carbonEmission * timeElapsed;

      currentActivity.distance = newDistance;
      currentActivity.carbonConsumption = newCarbonEmission;
      currentActivity.duration += timeElapsed;
    }

    currentActivity.timestamp = now;
    transportActivities[transportMode] = currentActivity;
    setTransportActivities({ ...transportActivities });
  };

  const handleUserSearch = async () => {
    console.log("PhoneNumber:", storedPhoneNumber);
    if (storedPhoneNumber && storedPhoneNumber.trim() === "") {
      alert("Phone number is empty, cannot search.");
      return;
    }

    try {
      const q = query(collection(db, "users"), where("phoneNumber", "==", parseInt(storedPhoneNumber)));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          setIsLoggedIn(true);
          const userData = doc.data();
          const transportActivitiesData = userData?.transportActivities || {};
          setTransportActivities(transportActivitiesData);
          updateTransportData();
          nav("/home");
        });
      } else {
        nav("/basic-details");
      }
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  };

  const handleActivitySearch = async () => {
    if (storedPhoneNumber && storedPhoneNumber.trim() === "") {
      alert("Phone number is empty, cannot search.");
      return;
    }

    try {
      const formattedDate = selectedDateObj.toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      const userQuery = query(
        collection(db, "users"),
        where("phoneNumber", "==", parseInt(storedPhoneNumber)),
        where("timestamp", ">=", formattedDate + ", 12:00:00 AM"),
        where("timestamp", "<=", formattedDate + ", 11:59:59 PM")
      );

      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        const transportActivitiesData = userData?.transportActivities || {};
        setTransportActivities(transportActivitiesData);
      } else {
        setTransportActivities({
          Still: {
            carbonConsumption: 0,
            distance: 0,
            duration: 0,
          },
          Walking: {
            carbonConsumption: 0,
            distance: 0,
            duration: 0,
          },
          Bike: {
            carbonConsumption: 0,
            duration: 0,
            distance: 0,
          },
          Car: {
            distance: 0,
            duration: 0,
            carbonConsumption: 0,
          },
          Train: {
            carbonConsumption: 0,
            duration: 0,
            distance: 0,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching user and transport activities:", error);
    }
  };

  const updateDataInFirebase = async () => {
    try {
      // Check if the user is logged in
      if (isLoggedIn) {
        const userQuery = query(collection(db, "users"), where("phoneNumber", "==", parseInt(storedPhoneNumber)));
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          const userId = userSnapshot.docs[0].id;
          const userDocRef = doc(db, "users", userId);
          const dataToSet = {
            transportActivities: transportActivities,
          };
          await setDoc(userDocRef, dataToSet, { merge: true });

          console.log('Data updated in Firebase at the end of the day.');
        } else {
          console.warn('User not found in Firebase. Data will not be updated.');
        }
      } else {
        console.warn('User is not logged in. Data will not be updated in Firebase.');
      }
    } catch (error) {
      console.error('Error updating data in Firebase:', error);
    }
  };

  const now = new Date();
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    0
  );
  const timeUntilEndOfDay = endOfDay - now;

  setTimeout(() => {
    updateDataInFirebase();
  }, timeUntilEndOfDay);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTransportData();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [transportMode]);


  useEffect(() => {
    handleUserSearch();
  }, [selectedDateObj])
  return (
    <stateContext.Provider
      value={{
        loading,
        setLoading,
        isLoggedIn,
        setIsLoggedIn,
        transportMode,
        setTransportMode,
        user,
        setUser,
        selectedDateObj,
        setSelectedDateObj,
        transportActivities,
        handleUserSearch,
        handleActivitySearch,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
