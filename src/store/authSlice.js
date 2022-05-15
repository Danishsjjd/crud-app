import { createSlice } from "@reduxjs/toolkit";

const authSLice = createSlice({
	name: "authSlice",
	initialState: {
		isLogin: false,
		userData: {},
	},
	reducers: {
		setUserData: (state, action) => {
			state.userData = action.payload;
		},
		setIsLogin: (state, action) => {
			state.isLogin = action.payload;
		},
	},
});

export default authSLice.reducer;
export const { setUserData, setIsLogin } = authSLice.actions;
