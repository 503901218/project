// 定义路由权限
import { Navigate } from "react-router-dom";
import { message } from "antd";
import { use, useEffect, useState } from "react";

const RouterAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  const timeout = localStorage.getItem("timeout");
  let timeNow = Date.now();
  const [shouldRedirect,setShouldRedirect]=useState(false)

    useEffect(()=>{
        if(!token&&timeNow > timeout){
            setShouldRedirect(true)
            localStorage.clear("timeout");
            message.error("登陆过期，请重新登陆");
        }
    },[timeout,token])

//   if (token || timeNow < timeout) {
//     return children;
//   } else {
//     if (timeNow > timeout) {
//       localStorage.clear("timeout");
//       message.error("登陆过期，请重新登陆");
//     }
//     return <Navigate to="/login" replace></Navigate>;
//   }
    if(shouldRedirect){
        return <Navigate to="/login" replace></Navigate>;
    }
    return children;
}; 

export default RouterAuth;
