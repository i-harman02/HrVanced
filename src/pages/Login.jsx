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

    if( fakeUser.email === formdata.email && fakeUser.password === formdata.password)
    {
      const token = generateToken();

      localStorage.setItem('token',token);
      localStorage.setItem("user", JSON.stringify(fakeUser));

       navigate("/dashboard");


    }else{
      alert("Wrong Crediential")
    }

  }



  return (
    <>
    <div className="flex justify-center items-center">
    <div className="bg-amber-300 p-3">
      <div>
        <p>email</p>
        <input className="bg-white" name="email" value={formdata.email}  onChange={handlechange} type="email" />
      </div>
      <div>
        <p>password</p>
        <input className="bg-white"  name="password" value={formdata.password} onChange={handlechange} type="password" />
      </div>
      <div>
        <button onClick={handleSubmit} className="px-1 cursor-pointer">Login</button>
      </div>
    </div>
    </div>
      
    </>
  )
}

export default Login
