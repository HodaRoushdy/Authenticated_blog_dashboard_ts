import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddBlog from "./AddBlog";
import { describe, expect, test } from "vitest";

const queryClient = new QueryClient();
describe("AddBlog", () => {
	test("renders correctly", () => {
		render(
			<MemoryRouter>
				<QueryClientProvider client={queryClient}>
					<AddBlog />
				</QueryClientProvider>
			</MemoryRouter>
		);
		const linkElement = screen.getByText(/Create Blog/i);
		expect(linkElement).toBeInTheDocument();
	});
});
