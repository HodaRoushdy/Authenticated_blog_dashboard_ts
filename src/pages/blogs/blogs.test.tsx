import { describe, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("lottie-react", () => ({
  default: () => <div data-testid="lottie-mock" />,
}));

import Blogs, { fetchBlogs } from "./Blogs";
import { mockData } from "../../utils/constants";
import test from "node:test";

// Mock global fetch
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, title: "Test Blog 1", body: "Test Content 1" },
          { id: 2, title: "Test Blog 2", body: "Test Content 2" },
        ]),
    })
  ) as unknown as typeof fetch;
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Blogs", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Blogs />
        </QueryClientProvider>
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/Explore Blogs/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("fetches blogs", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as unknown as typeof fetch;
    const result = await fetchBlogs();
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts"
    );
  });
});
