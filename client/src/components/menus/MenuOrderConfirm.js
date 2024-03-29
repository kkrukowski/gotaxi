// Router
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setContent } from "../../store/notificationSlice";
import {
  setStartLocationName,
  setStartLat,
  setStartLng,
  setDestLocationName,
  setDestLat,
  setDestLng,
  setRouteFound,
} from "../../store/locationInfoSlice";
import { setSearchResults } from "../../store/searchingSlice";
import {
  setSelectedItem,
  setIsDiscountNow,
  setDiscountValue,
} from "../../store/orderInfoSlice";

import addOrder from "../../features/addOrder";

import SearchOrderPathInfo from "../map/results/search-orders/SearchOrderPathInfo";
import Button from "../buttons/Button";

import axios from "axios";
import moment from "moment";

import { IoChevronBack } from "react-icons/io5";

const MenuOrderConfirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth
  const [userData, setUserData] = useState();

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
      setUserData({
        id: res.data.id,
      });
    });
  });

  const {
    startLat,
    startLng,
    startLocationName,
    destLat,
    destLng,
    destLocationName,
    price,
  } = useSelector((state) => state.locationInfo);

  const confirmHandler = () => {
    // Create order object
    const date = moment().format();

    const orderData = {
      startName: startLocationName,
      startCoords: [startLat, startLng],
      destName: destLocationName,
      destCoords: [destLat, destLng],
      price: price,
      date: date,
    };

    const userId = userData.id;

    // Add order to database
    addOrder(userId, orderData);

    // Reset store
    dispatch(setStartLocationName(null));
    dispatch(setStartLat(null));
    dispatch(setStartLng(null));
    dispatch(setDestLocationName(null));
    dispatch(setDestLat(null));
    dispatch(setDestLng(null));
    dispatch(setRouteFound(false));
    dispatch(setSelectedItem("regular"));
    dispatch(setIsDiscountNow(false));
    dispatch(setDiscountValue(null));
    dispatch(setSearchResults([]));

    dispatch(setContent("Potwierdzono przejazd!"));
    navigate("/order/waiting");
  };

  return (
    <section className="absolute z-10 h-auto w-[400px] ml-5 mt-5 p-[20px] bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="flex pb-[10px] w-full">
        {/* Back icon */}
        <Link to="/">
          <button className="relative p-1 flex items-center w-[24px] h-[24px]">
            <IoChevronBack color="#111827" className="w-[24px] h-[24px]" />
          </button>
        </Link>
        {/* Logo */}
        <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
          Zamawianie
        </span>
      </div>
      <form
        className="flex flex-col justify-end items-end"
        onSubmit={confirmHandler}
      >
        <SearchOrderPathInfo />
        <div className="flex flex-col justify-end items-end">
          <span className="w-fit mt-[10px] text-lg text-gray-900 leading-none">
            Cena
          </span>
          <span className="w-fit text-2xl font-bold leading-tight">
            {price === "FREE" ? "FREE" : price + "zł"}
          </span>
        </div>
        <Button name="Potwierdź" />
      </form>
    </section>
  );
};

export default MenuOrderConfirm;
