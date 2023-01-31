import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header component test", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("Should render a form", () => {
    const formElement = screen.queryByRole("form");
    expect(formElement).toHaveLength(1);
  });

  it("Should render a h1 with text 'Add new task'", () => {
    const formElement = screen.getByRole("heading");
    expect(formElement).toBeInTheDocument();
  });

  it("should render an input with placeholder 'Enter Task title...'", () => {
    const taskTitleInput = screen.queryByPlaceholderText("Enter Task title...");

    expect(taskTitleInput).toBeInTheDocument();
  });
});
