import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ children, redirectPath = "/login", isLogin }) => {
	if (!isLogin) {
		return <Navigate to={redirectPath} replace />;
	}
	return children ? children : <Outlet />;
};

export default PrivateRoutes
