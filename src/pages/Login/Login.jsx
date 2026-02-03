import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import HomeImg from "../../assets/Group 3475 (1).png";
import { toast } from "react-toastify";
import Toaster from "../../components/Toaster";
;
import logo from "../../assets/vanced-logo.png";

import { useDispatch } from "react-redux";
import { loginUser } from "../../slices/userSlice";


const Login = () => {
  const dispatch = useDispatch();


  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = "Email is required";
      else if (!emailRegex.test(value)) error = "Enter a valid email";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 2)
        error = "Password must be at least 2 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const isFormValid =
    formdata.email && formdata.password && !errors.email && !errors.password;

  // 🔥 BACKEND LOGIN USING FETCH
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isFormValid) return;

  // eslint-disable-next-line no-undef
  const res = await dispatch(loginUser(formdata));

  if (res.meta.requestStatus === "fulfilled") {
    toast.success("Login successful 🎉");
    setTimeout(() => navigate("/dashboard"), 1500);
  } else {
    toast.error(res.payload);
  }
};

  return (
    <>
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="bg-white p-4 flex items-center justify-center">
          <div>
            <img className="mb-8" src={logo} alt="" />
            <h1 className="text-2xl font-bold mb-3">WELCOME BACK !!</h1>
            <p className=" mb-10">Please login to your account.</p>

            <div className="flex flex-col mb-2">
              <label className="mb-2.5 font-medium">Email</label>
              <input
                className="p-2 border"
                name="email"
                value={formdata.email}
                onChange={handlechange}
                type="email"
              />
              <p className="text-red-500 text-sm">{errors.email}</p>
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2.5 font-medium">Password</label>
              <input
                className="p-2 border"
                name="password"
                value={formdata.password}
                onChange={handlechange}
                type="password"
              />
              <p className="text-red-500 text-sm">{errors.password}</p>
            </div>
            <div className="flex flex-col">
              <button
                onClick={handleSubmit}
                className="bg-[#2C3EA1] py-3 px-36 rounded text-white font-bold cursor-pointer"
              >
                Log In
              </button>

            </div>
          </div>
        </div>

        <div className="bg-[#2C3EA1] flex items-center justify-center">
          <img src={HomeImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
