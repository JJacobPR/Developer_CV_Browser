import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { refreshUser } from "@store/authSlice";
import React, { useEffect } from "react";
import { Navigate } from "react-router";
import Spinner from "../ui/spinner/Spinner";

interface Props {
  child: React.ReactNode;
  role: string | string[];
}

const Authorized = ({ child, role }: Props) => {
  const token = localStorage.getItem("token");
  const fallback = <Navigate to="/" replace />;
  const dispatch = useAppDispatch();
  const { status, loggedUser } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (status === "IDLE") {
      dispatch(refreshUser());
    }
  }, [status, dispatch]);

  if (!token) return fallback;

  if (status === "IDLE" || status === "LOADING") {
    return <Spinner size={40} />;
  }

  const requiredRoles = Array.isArray(role) ? role : [role];

  if (loggedUser?.role && requiredRoles.includes(loggedUser.role)) {
    return <>{child}</>;
  } else {
    return fallback;
  }
};
export default Authorized;
