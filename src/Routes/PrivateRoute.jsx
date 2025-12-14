import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Spinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <LoadingSpinner />

    if (user) return children

    return <Navigate to={'/login'} state={location.pathname}></Navigate>
}

export default PrivateRoute