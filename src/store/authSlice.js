import { createSlice } from "@reduxjs/toolkit";

const authSLice = createSlice({
	name: "authSlice",
	initialState: {
		isLogin: localStorage.getItem("isLogin") == null ? false : true,
		userData: {},
	},
	reducers: {
		setUserData: (state, action) => {
			state.userData = action.payload;
		},
		setIsLogin: (state, action) => {
			localStorage.setItem("isLogin", action.payload);
			state.isLogin = action.payload;
		},
	},
});

export default authSLice.reducer;
export const { setUserData, setIsLogin } = authSLice.actions;
