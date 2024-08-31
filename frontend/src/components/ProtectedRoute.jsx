import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ isAdmin, children }) => {
    if (!isAdmin) {
        // Redirect to the login page if not an admin
        return <Navigate to="/" replace />;
    }

    // Otherwise, render the children components
    return children;
};

export default ProtectedRoute;
