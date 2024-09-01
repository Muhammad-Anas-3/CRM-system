import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        // If no user in localStorage, redirect to login
        return <Navigate to="/login" />;
    }

    // Otherwise, render the children components
    return children;
};

export default ProtectedRoute;
