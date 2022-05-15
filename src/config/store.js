import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/authSlice";

const store = configureStore({
	reducer: {
		authSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
