import {describe, expect, test} from "vitest";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/vitest'
import AuthorList from "./components/author/AuthorList.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        }
    }
});

const wrapper = ({children} : { children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("AuthorList tests", () => {
    test("component renders correctly", () => {
        render(<AuthorList />, {wrapper});
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    })
});