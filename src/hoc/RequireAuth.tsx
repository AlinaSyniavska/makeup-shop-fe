import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAppSelector } from "../hooks";

interface IProps {
  children: any;
}

const RequireAuth = ({ children }: IProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (!isAuth) {
      // return <Navigate to={'/auth/login'} state={location} />
      navigate("/auth/login", { state: { location } });
    }
  }, [isAuth, navigate, location]);

  return children;
};

export { RequireAuth };
