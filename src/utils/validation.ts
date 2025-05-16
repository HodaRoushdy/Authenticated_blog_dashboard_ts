import * as Yup from "yup";
const emailRgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRgx =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const loginValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Please enter email address")
		.matches(emailRgx),
	password: Yup.string()
		.required("Password field is required")
		.min(8, "Password should be between 8 and 20 characters")
		.max(20, "Password should be between 8 and 20 characters")
		.matches(passwordRgx, {
			message:
				"Password should have at lease 1 uppercase character, 1 special character and 1 number ",
		}),
});

export const signUpValidationSchema = Yup.object().shape({
	name: Yup.string().required(
		"Please enter your name"
	).min(3, "Name should be at least 3 characters"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Please enter email address")
		.matches(emailRgx),
	image: Yup.string().required("image field is required"),
	password: Yup.string()
		.required("Password field is required")
		.min(8, "Password should be between 8 and 20 characters")
		.max(20, "Password should be between 8 and 20 characters")
		.matches(passwordRgx, {
			message:
				"Password should have at lease 1 uppercase character, 1 special character and 1 number ",
		}),
	confirmPassword: Yup.string()
		.required("Confirm Password field is required")
		.oneOf([Yup.ref("password")], "Passwords must match"),
});

export const blogValidationSchema = Yup.object().shape({
	title: Yup.string()
		.required("please enter the title of blog")
		.min(3, "at least 3 characters")
		.max(15),
	body: Yup.string()
		.required("please enter the body of blog")
		.min(3, "at least 3 characters"),
});
