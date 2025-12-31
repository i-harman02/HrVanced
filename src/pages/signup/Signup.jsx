import { useState } from "react";
import { apicall } from "../../components/commonAPI/CallAPI";
import { Link, useNavigate } from "react-router-dom";
import HomeImg from "../../assets/Group 3475 (1).png";
import logo from "../../assets/vanced-logo.png";
const Signup = () => {
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });


   const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value) error = "Name is required";
      else if (value.length < 2)
        error = "Name must be at least 2 characters";
    }

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
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
     validateField(name, value);

    // console.log("Form Data:", formdata);
  };

const isFormValid =
    formdata.name &&
    formdata.email &&
    formdata.password &&
    !errors.name &&
    !errors.email &&
    !errors.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!formdata.name || !formdata.email || !formdata.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await apicall("/register", "POST", formdata);
      if (res?.data) {
        navigate("/login");
        alert("Signup successful 🎉");
      } else {
        alert(res?.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="bg-white p-4 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="p-6 min-w-75  ">
          <img className="mb-8" src={logo} alt="" />
          <h2 className="text-xl font-semibold mb-4  text-start">
            Create your new account
          </h2>

          <div className="flex flex-col mb-4">
            <label className="block mb-1 font-medium ">Name</label>
            <input
              className="p-2 border"
              name="name"
              value={formdata.name}
              onChange={handlechange}
              type="text"
              placeholder="Enter your name"
            />
              <p className="text-red-500 text-sm">{errors.name}</p>
          </div>

          <div className="flex flex-col mb-4">
            <label className="block mb-1 font-medium ">Email</label>
            <input
              className="p-2 border"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              type="email"
              placeholder="Enter your email"
            />
              <p className="text-red-500 text-sm">{errors.email}</p>
          </div>

          <div className="flex flex-col mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input
              className="p-2 border"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              type="password"
              placeholder="Enter password"
            />
             <p className="text-red-500 text-sm">{errors.password}</p>
          </div>
<div className="flex flex-col">
              <button
            type="submit"
            disabled={!isFormValid}
            className="bg-[#2C3EA1] py-3 px-36 rounded text-white font-bold cursor-pointer"
          >
            Sign Up
          </button>
           <p className="text-[12px] mt-2 flex  gap-1">
                Already have account{" "}
                <Link
                  to="/login"
                  className="text-blue-800 cursor-pointer underline font-semibold"
                >
                  LogIn
                </Link>
              </p>
              </div>
        </form>
      </div>
      <div className="bg-[#2C3EA1] flex items-center justify-center">
        <img src={HomeImg} alt="" />
      </div>
    </div>
  );
};

export default Signup;
