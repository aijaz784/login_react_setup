import react, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import {auth, sendPasswordResetEmail} from '../Firebase/Firebase-config.js'
 


const Forget = () => {
  
  const [forgetEmail,setForgetEmail]=useState("")
  const navigate=useNavigate()

 function forgetPassword(){
  if(forgetEmail===""){
    alert("Please Enter Email")
  }else{
    sendPasswordResetEmail(auth,forgetEmail)
    .then(()=>{
      alert("Reset Password Will Send On your Email")
      setTimeout(() => {
        navigate("/")
      },100);
    })
    .catch((e)=>{
      alert("Error "+e.massege)
    })
    
    
  }
 }
  

  return (
    <>
      <div className="bg-gradient-to-br from-blue-200 to-pink-100 w-full h-screen flex items-center justify-center">
        <div className="bg-black/10 w-100  rounded    z-10 text-black p-5 shadow-2xl">
          <div className="text-4xl  text-center mb-5 font-bold"> Reset Password</div>
          <div className="border rounded  mb-5 flex justify-between items-center ">
            <input
              type="email"
              placeholder="Enter your Email"
              className="p-1.5 w-full outline-none"
              onChange={(e)=>setForgetEmail(e.target.value)}
            />
          </div>
           
    <div className="text-[12px] font-bold   items-center text-right mb-5">
            
            <div>
              Back to login ?{" "}
              <Link to="/" className="text-blue-800 underline">
                Sign In
              </Link>
            </div>
          </div>
           
          <button onClick={forgetPassword} className="mb-5 w-full p-1 rounded bg-blue-900 text-white outline-none cursor-pointer active:scale-80 transition-all">
             Reset Email
          </button>
          
          
        </div>
      </div>
    </>
  );
};

export default Forget;
