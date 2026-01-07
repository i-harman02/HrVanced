import React, { useEffect, useState } from "react";
import HolidayImage from "../assets/Rectangle 56.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchHolidays } from "../slices/holidaySlice";
import UpcomingPopup from "../components/UpcomingPopup";

const Upcomingholidays = () => {
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
    return image.startsWith("http")
      ? image
      : `${IMAGE_URL}${image}`;
  };

  return (
    <div>
      <div className="rounded-xl border border-gray-200 p-4 md:p-6 h-full">
        <div className="flex justify-between items-start mb-14">
          <span className="text-base leading-none font-medium">
            Upcoming Holidays
          </span>

          <button
            onClick={() => setHolidayModal(true)}
            className="mr-3 text-sm text-blue-600 hover:underline"
          >
            View All
          </button>

          {holidayModal && (
            <UpcomingPopup onClose={() => setHolidayModal(false)} />
          )}
        </div>

        {upcomingHoliday ? (
          <div className="flex gap-3 items-center">
            <img
              src={getImageUrl(upcomingHoliday.image)}
              alt="Holiday"
              className="w-12 h-12 rounded-md object-cover"
            />

            <div>
              <p className="text-sm font-medium">
                {upcomingHoliday.holidayName}
              </p>

              <p className="text-[12px] text-gray-500">
                {new Date(upcomingHoliday.startDate).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No upcoming holidays
          </p>
        )}
      </div>
    </div>
  );
};

export default Upcomingholidays;
