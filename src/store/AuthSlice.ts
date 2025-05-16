import { createSlice } from "@reduxjs/toolkit";
import personImg from '../../public/default img.jpg';

const AuthSlice = createSlice({
	name: "Auth",
	initialState: {
		auth: localStorage.getItem("token") ? true : false,
	},
	reducers: {
		signup(state, action) {
			const { name, email, image } = JSON.parse(action.payload);
			const user = { id: 20, name, email, image };
			state.auth = true;
			localStorage.setItem("token", JSON.stringify(user));
			if (!localStorage.getItem("blogs")) {
				localStorage.setItem("blogs", JSON.stringify([]));
			}
		},
		login(state,action){
			const { email } = action.payload;
			const user = { id: 20, image: personImg, name: email.split('@')[0],email };
			state.auth = true;
			localStorage.setItem("token", JSON.stringify(user));
			if (!localStorage.getItem("blogs")) {
				localStorage.setItem("blogs", JSON.stringify([]));
			}
		},
		logout(state) {
			state.auth = false;
			localStorage.removeItem("token");
		},
	},
});

export const { signup, logout, login } = AuthSlice.actions;
export default AuthSlice;
