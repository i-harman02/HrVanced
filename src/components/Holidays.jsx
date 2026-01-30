import React, { useEffect, useState } from "react";
import HolidayImage from "../assets/Rectangle 56.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchHolidays } from "../slices/holidaySlice";
import UpcomingPopup from "../components/UpcomingPopup";

const holidays = () => {
  const dispatch = useDispatch();
  const [holidayModal, setHolidayModal] = useState(false);

  const { holidays } = useSelector((state) => state.holiday);

  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

  useEffect(() => {
    dispatch(fetchHolidays(new Date().getFullYear()));
  }, [dispatch]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get upcoming holiday
  const upcomingHoliday = holidays
    ?.filter((h) => new Date(h.startDate) >= today)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0];

  // Handle both relative & absolute image URLs safely
  const getImageUrl = (image) => {
    if (!image) return HolidayImage;
    return image.startsWith("http") ? image : `${IMAGE_URL}${image}`;
  };
  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-heading">Holidays</h1>
      </div>
      <div className="bg-[#2F353B] rounded-xl p-10 overflow-x-auto">
 
      </div>
    </>
  );
};

export default holidays;
