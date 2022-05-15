import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = ({ children, redirectPath = "/", isLogin }) => {
	if (isLogin) {
		return <Navigate to={redirectPath} replace />;
	}
	return children ? children : <Outlet />;
};

export default PublicRoutes
