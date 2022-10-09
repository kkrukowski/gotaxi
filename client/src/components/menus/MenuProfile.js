import Button from "../buttons/Button";

import axios from "axios";

import logoutUser from "../../features/logoutUser";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoChevronBack } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";

// Import Redux and notificationSlice
import { useDispatch } from "react-redux";
import { setContent } from "../../store/notificationSlice";

const MenuProfile = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
  });

  useEffect(() => {
    const isAuthUrl = "http://localhost:5000/api/isAuth";
    const isAuthData = axios
      .get(isAuthUrl, { withCredentials: true })
      .catch((res) => {
        if (res.status !== 200) {
          navigate("/login");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    isAuthData.then((res) => {
      setUserData({ email: res.data.email });
    });
  });

  const backBtnHandler = () => {
    navigate("/");
  };

  const logoutHandler = async () => {
    const logout = await logoutUser();
    if (logout) {
      dispatch(setContent("Pomyślnie wylogowano!"));
      navigate("/");
    }
  };

  return (
    <section className="absolute h-auto w-[400px] ml-5 mt-5 bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="relative h-auto w-full p-5 rounded-t-[20px] bg-yellow-400">
        {/* Controls */}
        <div className="flex w-full">
          {/* Back icon */}
          <button
            onClick={backBtnHandler}
            className="relative p-1 flex items-center w-[24px] h-[24px]"
          >
            <IoChevronBack color="#111827" className="w-[24px] h-[24px]" />
          </button>
          {/* Logo */}
          <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
            Profil
          </span>
          <div className="p-1 w-[24px] h-[24px]"></div>
        </div>

        {/* User avatar */}
        <div className="flex justify-center mt-[20px]">
          <BiUserCircle className="h-[96px] w-[96px]" />
        </div>

        {/* Username */}
        <p className="text-center font-bold text-lg">{userData.email}</p>
      </div>
      {/* Recent searches */}
      <div className="p-5 pt-0">
        <Button name="Wyloguj się" clickFunc={logoutHandler} />
      </div>
    </section>
  );
};

export default MenuProfile;