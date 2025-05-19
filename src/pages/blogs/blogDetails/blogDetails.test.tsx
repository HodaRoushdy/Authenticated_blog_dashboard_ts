import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { mockData } from "../../../utils/constants";
import BlogDetails, { fetchBlog } from "./BlogDetails";

vi.mock("lottie-react", () => ({
  default: () => <div data-testid="lottie-mock" />,
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("specific Blog", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <BlogDetails />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });
  test("fetches blog", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData[0]),
      })
    ) as unknown as typeof fetch;
    const result = await fetchBlog(mockData[0].id);
    expect(result).toEqual(mockData[0]);
    expect(global.fetch).toBeCalledWith(
      "https://jsonplaceholder.typicode.com/posts/" + mockData[0].id
    );
  });
});
