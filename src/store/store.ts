import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

const store = configureStore({
	reducer: {
		Auth: AuthSlice.reducer,
	},
});
export default store;
