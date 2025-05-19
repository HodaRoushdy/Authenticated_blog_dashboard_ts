import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isLogin = useSelector((state:{Auth:{auth:boolean}}) => state.Auth.auth);
  return isLogin ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoutes;
