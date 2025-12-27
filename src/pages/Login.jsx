import { useState } from "react"
import { fakeUser } from "../utils/Fakeuser";
import { generateToken } from "../utils/Faketoken";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [formdata, setFormdata]= useState({
    email:"",
    password : "",
  })

  const handlechange = (e) =>{
    const {name , value} = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name] : value
    })
  );
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    const matchUser = fakeUser.find((user)=>
      user.email === formdata.email && 
      user.password === formdata.password

    )

    if( matchUser )
    {
      const token = generateToken();

      localStorage.setItem('token',token);
      localStorage.setItem("user", JSON.stringify(matchUser));

       navigate("/dashboard", { replace: true });


    }else{
      alert("Wrong Crediential")
    }

  }



  return (
    <>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen ">
        <div className="bg-white p-4  ">
          <div className="flex items-center justify-center h-full ">
            <div className="">
              <img className="mb-10" src="./Images/logo.png" alt="" />
              <h1 className="text-2xl font-bold mb-3">WELCOME BACK !!</h1>
              <p className="text-[#71717B] mb-10">
                Please login to your account.
              </p>

              <div className="flex flex-col mb-4  h-auto">
                <label className="mb-[10px] font-medium" htmlFor="">
                  Email
                </label>
                
               <input className="bg-white" name="email" value={formdata.email}  onChange={handlechange} type="email" />
                {/* {error && touched && (
                  <p className="text-red-500 text-sm mt-1 ">{error}</p>
                )} */}
              </div>

              <div className="flex flex-col mb-4">
                <label className="mb-[10px] font-medium" htmlFor="">
                  Password
                </label>
               
        <input className="bg-white"  name="password" value={formdata.password} onChange={handlechange} type="password" />
              </div>

              <div className="flex gap-4 mb-8">
                {" "}
                {/* <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                /> */}
                <p className="text-[#71717B]">Remember me</p>{" "}
              </div>
              <button onClick={handleSubmit}  className="bg-[#2C3EA1]  py-3 px-[145px] rounded text-amber-50 font-bold ">
                Log In
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#2C3EA1] p-4">
          <div className="flex items-center justify-center h-full ">
            <img
              className="object-cover"
              src="./Images/Group 3475.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
