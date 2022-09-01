import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, auth, navigate }) => {
  return auth ? children : <Navigate to={navigate} />;
};

export default ProtectedRoute;
