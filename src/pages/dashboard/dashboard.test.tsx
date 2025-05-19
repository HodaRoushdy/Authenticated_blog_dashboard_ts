import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { describe, it, beforeEach, vi, afterEach, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Dashboard", () => {
	const mockUser = {
		name: "John Doe",
		email: "john@example.com",
		image: "https://example.com/john.jpg",
	};

	const mockBlogs = [
		{ id: 1, title: "First Blog", body: "This is the first blog body." },
		{ id: 2, title: "Second Blog", body: "This is the second blog body." },
	];

	beforeEach(() => {
		localStorage.clear();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	const renderWithQuery = () =>
		render(
			<QueryClientProvider client={queryClient}>
				<Dashboard />
			</QueryClientProvider>
		);

	it("renders user info and blogs from localStorage", () => {
		localStorage.setItem("token", JSON.stringify(mockUser));
		localStorage.setItem("blogs", JSON.stringify(mockBlogs));

		renderWithQuery();

		// Check user info
		expect(screen.getByText(mockUser.name)).toBeInTheDocument();
		expect(screen.getByText(mockUser.email)).toBeInTheDocument();
		expect(screen.getByAltText("userImg")).toHaveAttribute(
			"src",
			mockUser.image
		);

		// Check blog posts
		expect(screen.getByText("First Blog")).toBeInTheDocument();
		expect(screen.getByText("Second Blog")).toBeInTheDocument();
	});

	it("renders fallback message if no blogs are found", () => {
		localStorage.setItem("token", JSON.stringify(mockUser));
		localStorage.setItem("blogs", JSON.stringify([]));

		renderWithQuery();

		expect(
			screen.getByText("You don't have any blogs, create your own now")
		).toBeInTheDocument();
	});
});
