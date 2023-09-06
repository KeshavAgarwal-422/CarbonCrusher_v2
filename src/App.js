import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Introduction from "./pages/Introduction";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Redemption from "./pages/Redemption";
import { IoHome, IoNotificationsSharp, IoPersonSharp, IoPricetagsSharp, IoWalletSharp } from "react-icons/io5"
import { FaCarSide, FaPerson, FaPersonWalking, FaTrainTram } from 'react-icons/fa6';
import { FaCarAlt } from 'react-icons/fa';
import { RiEBikeFill } from 'react-icons/ri'
import Notifications from "./pages/Notifications";
import Wallet from "./pages/Wallet";
import SensorComponent from "./Components/SensorComponent";
import BasicDetails from "./pages/BasicDetails";
import Test from "./pages/Test";
import { useStateContext } from "./Context";
import Loading from "./Components/Loading";


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [activeTab, setActiveTab] = useState('home');
  const { transportMode, loading, isLoggedIn } = useStateContext();

  const tabs = [
    { name: 'home', icon: <IoHome></IoHome> },
    { name: 'Redeem', icon: <IoPricetagsSharp></IoPricetagsSharp> },
    { name: 'notifications', icon: <IoNotificationsSharp></IoNotificationsSharp> },
    { name: 'profile', icon: <IoPersonSharp></IoPersonSharp> },
    { name: 'wallet', icon: <IoWalletSharp></IoWalletSharp> },

  ];

  const categoryIconMapping = {
    'Still': <FaPerson />,
    'Walking': <FaPersonWalking />,
    'Train': <FaTrainTram />,
    'Bike': <RiEBikeFill />,
    'Car': <FaCarAlt />,
  };

  useEffect(() => { }, [transportMode, loading, isLoggedIn])
  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <div className="h-screen w-screen bg-[#141414] text-[#E0FF63] font-outfit relative overflow-y-auto">
      <SensorComponent />
      {loading ? <Loading /> : (<Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/test" element={<SensorComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/basic-details" element={<BasicDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/redeem" element={<Redemption />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>)}

      {isLoggedIn ? (<> <div className="fixed bottom-0 left-0 w-full h-[8vh] bg-[#141414] flex justify-around items-center rounded-s-xl">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`text-[3vh] ${activeTab === tab.name ? 'text-[#E0FF63]' : 'text-white'} bg-transparent`}
            onClick={() => {
              setActiveTab(tab.name);
              navigate(`/${tab.name}`)
            }}
          >
            {tab.icon}
          </div>
        ))}
        <div
          className="text-[3vh] bg-[#272727] p-[1.5vw] rounded-full flex justify-center items-center"
          style={{ borderWidth: '2px', borderColor: '#CFFF0F', borderStyle: 'solid' }}
        >
          {categoryIconMapping[transportMode]}
        </div>
      </div></>) : (<></>)}
    </div>
  );
}
export default App;
