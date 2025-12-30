import { useState } from "react";
import { fakeUser } from "../../utils/Fakeuser";
import { generateToken } from "../../utils/Faketoken";
import { useNavigate } from "react-router-dom";
import vsLogo from "../../assets/vanced-logo.png"
import HomeImg from "../../assets/Group 3475 (1).png";
import { toast } from "react-toastify";
import Toaster from "../../components/Toaster";

const Login = () => {
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
      else if (value.length < 6)
        error = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handlechange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const isFormValid =
    formdata.email && formdata.password && !errors.email && !errors.password;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    const matchUser = fakeUser.find(
      (user) =>
        user.email === formdata.email && user.password === formdata.password
    );

    if (matchUser) {
      const token = generateToken();

      // existing logic (unchanged)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(matchUser));

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);

      toast.success("Login successful 🎉");
    } else {
      toast.error("User not found ");
    }
  };

  return (
    <>
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen ">
        <div className="bg-white p-4">
          <div className="flex items-center justify-center h-full">
            <div>
              <img className="mb-10" src={vsLogo} alt="" />
              <h1 className="text-2xl font-bold mb-3">WELCOME BACK !!</h1>
              <p className="text-[#71717B] mb-10">
                Please login to your account.
              </p>

              <div className="flex flex-col mb-2 min-h-25">
                <label className="mb-2.5 font-medium">Email</label>
                <input
                  className="bg-white p-2 rounded-sm border border-bordergray"
                  name="email"
                  value={formdata.email}
                  onChange={handlechange}
                  type="email"
                />
                <p
                  className={`text-red-500 text-sm mt-1 min-h-4 ${
                    errors.email ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {errors.email}
                </p>
              </div>

              <div className="flex flex-col mb-2 min-h-25">
                <label className="mb-2.5 font-medium">Password</label>
                <input
                  className="bg-white p-2 rounded-sm border border-bordergray"
                  name="password"
                  value={formdata.password}
                  onChange={handlechange}
                  type="password"
                />
                <p
                  className={`text-red-500 text-sm mt-1 min-h-4 ${
                    errors.password ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {errors.password}
                </p>
              </div>

              <div className="flex gap-4 mb-6">
                <input type="checkbox" />
                <p className="text-[#71717B]">Remember me</p>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-[#2C3EA1] cursor-pointer py-3 px-36.25 rounded text-amber-50 font-bold"
              >
                Log In
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#2C3EA1] p-4">
          <div className="flex items-center justify-center h-full">
            <img className="object-cover" src={HomeImg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
