import React from "react";
import { Navigate, useLocation} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  
  let location = useLocation();

  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
