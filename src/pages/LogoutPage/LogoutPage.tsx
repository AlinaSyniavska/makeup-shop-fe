import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks";
import { authActions } from "../../redux";

const LogoutPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access") as string;

  useEffect(() => {
    (async () => {
     await Promise.all([
        await dispatch(authActions.logout({ access_token: accessToken })),
        navigate("/home"),
      ]);
    })();
  }, [dispatch]);

  return <></>;
};

export { LogoutPage };
