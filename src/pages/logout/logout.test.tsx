// src/pages/logout/logout.test.tsx

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Logout from "./Logout";
import { logout } from "../../store/AuthSlice";

vi.mock("../../store/AuthSlice", () => ({
	logout: vi.fn(() => ({ type: "auth/logout" })),
}));

const mockStore = configureStore([]);

describe("Logout Page", () => {
	it("should render confirmation text and submit button", () => {
		const store = mockStore({});

		render(
			<Provider store={store}>
				<Logout />
			</Provider>
		);

		expect(
			screen.getByText(/do you sure you want to logout/i)
		).toBeInTheDocument();

		expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
	});

	it("should dispatch logout action when button is clicked", () => {
		const store = mockStore({});
		store.dispatch = vi.fn();

		render(
			<Provider store={store}>
				<Logout />
			</Provider>
		);

		fireEvent.click(screen.getByRole("button", { name: /submit/i }));

		expect(store.dispatch).toHaveBeenCalledWith(logout());
	});
});
