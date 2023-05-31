import propTypes from "prop-types";
import React from "react";
import { Navigate, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRequestedUrl,
  setRequestedUrl,
} from "../../features/home/homeSlice";
import { useLocation } from "react-router-dom";

function ConditionalRoute({ redirectUrl, condition }) {
  const location = useLocation();
  const requestedUrl = useSelector(selectRequestedUrl);
  const dispatch = useDispatch();
  if (requestedUrl === "") {
    dispatch(setRequestedUrl(location.pathname));
  }
  return <>{!condition ? <Navigate to={redirectUrl} /> : <Outlet />}</>;
}

export default ConditionalRoute;

ConditionalRoute.propTypes = {
  redirectUrl: propTypes.string.isRequired,
  condition: propTypes.bool.isRequired,
};
