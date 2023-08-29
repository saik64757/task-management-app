import { render, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";

test("Testing the Welcome Page", () => {
  render(<HomePage />);
  const textElement = screen.getByText("Welcome to Task Manager");
  expect(textElement).toBeInTheDocument();
});
