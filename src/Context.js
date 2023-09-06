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
} from "firebase/firestore";


const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [transportMode, setTransportMode] = useState("Still");
  const [user, setUser] = useState({})
  const [transportActivities, setTransportActivities] = useState([]);
  const [selectedDateObj, setSelectedDateObj] = useState(new Date());
  const storedPhoneNumber = localStorage.getItem("phoneNumber");

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
    console.log("PhoneNumber:", storedPhoneNumber);
    if (storedPhoneNumber && storedPhoneNumber.trim() === "") {
      alert("Phone number is empty, cannot search.");
      return;
    }

    try {

      const userQuery = query(
        collection(db, "users"),
        where("phoneNumber", "==", parseInt(storedPhoneNumber)
        ))

      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();


        const transportActivities = userData?.transportActivites || [];
        const todayTransportActivities = transportActivities.filter(
          (activity) => {

            if (activity.timestamp) {
              const activityTimestamp = new Date(activity.timestamp);
              return (
                activityTimestamp >= selectedDateObj &&
                activityTimestamp < new Date(selectedDateObj.getTime() + 86400000)
              );
            }
            return false;
          }
        );
        setTransportActivities(todayTransportActivities);

        console.log("TransportActivities", transportActivities);
      } else {
        setTransportActivities([]);

      }
    } catch (error) {
      console.error("Error fetching user and transport activities:", error);
    }
  };


  // useEffect(() => {
  //   handleActivitySearch();
  // }, [selectedDateObj,])

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
        handleActivitySearch
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);