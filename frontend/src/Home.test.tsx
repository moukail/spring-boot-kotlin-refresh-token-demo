import {describe, expect, test} from "vitest";
import Home from "./pages/Home.tsx";
import {render, screen} from "@testing-library/react";

describe("Home tests", () => {
    test("component renders correctly", () => {
        render(<Home />);
        expect(screen.getByText(/Home/i)).toBeDefined();
    })
});