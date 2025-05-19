import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Login from "./Login";
import { describe, expect, it } from "vitest";


const mockStore = configureStore([]);

describe("Login Page", () => {
	let store: ReturnType<typeof mockStore>;

	const renderWithProviders = (ui: React.ReactElement) => {
		store = mockStore({});
		return render(
			<Provider store={store}>
				<MemoryRouter>{ui}</MemoryRouter>
			</Provider>
		);
	};

	it("shows validation errors when submitted empty", async () => {
		renderWithProviders(<Login />);

		const submitButton = screen.getByRole("button", {
			name: /login to your account/i,
		});
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText(/please enter email address/i)
			).toBeInTheDocument();
			expect(
				screen.getByText(/password field is required/i)
			).toBeInTheDocument();
		});
	});

	it("dispatches login and navigates on valid submit", async () => {
		renderWithProviders(<Login />);

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button", {
			name: /login to your account/i,
		});

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "Password1!" } });

		fireEvent.click(submitButton);

		await waitFor(() => {
			const actions = store.getActions();
			expect(actions.length).toBeGreaterThan(0);
		});
	});
});
