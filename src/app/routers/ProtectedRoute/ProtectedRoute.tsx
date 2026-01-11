// src/features/auth/ui/ProtectedRoute.tsx

// import { useGetUrls } from "@/shared/model";
// import { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom"; // ← Outlet!

const ProtectedRoute = () => {
  const isLogin = true; // замени на свой auth state
  const location = useLocation();

  // const {data} = useGetUrls()
  
  // useEffect(()=> {
  //   if(data) {
  //   // console.log(data)
  //   }
    
  // }, [data])

  if (!isLogin) {

    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />; // ← вот так!
};

export default ProtectedRoute;
