// src/pages/signup/SignUp.test.tsx

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";
import { signup } from "../../store/AuthSlice";


vi.mock("../../store/AuthSlice", () => ({
	signup: vi.fn((payload) => ({ type: "auth/signup", payload })),
}));

const mockStore = configureStore([]);

describe("SignUp Page", () => {
	it("renders the form fields and submit button", () => {
		const store = mockStore({});

		render(
			<Provider store={store}>
				<BrowserRouter>
					<SignUp />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/image:/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/^password:/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/confirm password:/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /sign up to your account/i })
		).toBeInTheDocument();
	});

	it("submits form with valid data and dispatches signup", async () => {
		const store = mockStore({});
		store.dispatch = vi.fn();

		render(
			<Provider store={store}>
				<BrowserRouter>
					<SignUp />
				</BrowserRouter>
			</Provider>
		);

		fireEvent.change(screen.getByLabelText(/name:/i), {
			target: { value: "John Doe" },
		});
		fireEvent.change(screen.getByLabelText(/email:/i), {
			target: { value: "john@example.com" },
		});
		fireEvent.change(screen.getByLabelText(/image:/i), {
			target: { value: "https://example.com/img.jpg" },
		});
		fireEvent.change(screen.getByLabelText(/^password:/i), {
			target: { value: "Password1@" },
		});
		fireEvent.change(screen.getByLabelText(/confirm password:/i), {
			target: { value: "Password1@" },
		});

		fireEvent.click(
			screen.getByRole("button", { name: /sign up to your account/i })
		);

		await waitFor(() => {
			expect(store.dispatch).toHaveBeenCalledWith(
				signup(
					JSON.stringify({
						name: "John Doe",
						email: "john@example.com",
						image: "https://example.com/img.jpg",
						password: "Password1@",
						confirmPassword: "Password1@",
					})
				)
			);
		});
	});
});
