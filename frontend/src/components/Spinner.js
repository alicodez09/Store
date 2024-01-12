import React,{useState,useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";
const Spinner = ({path="login"}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const [count,setCount]=useState(3);

    useEffect(()=>{
        const interval=setInterval(() => {
            setCount((prevValue)=>--prevValue)
        }, 1000);
        count ===0 && navigate(`/${path}`,{state:location.pathname})
        return ()=>clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <>
      <div className="d-flex justify-content-center flex-column align-items-center" style={{height:"100vh"}}>
   
       <h1 className="text-center ">Redirecting you in {count} seconds</h1>
  
        <div className="spinner-border" role="status">
         
        </div>
      </div>
    </>
  );
};

export default Spinner;
