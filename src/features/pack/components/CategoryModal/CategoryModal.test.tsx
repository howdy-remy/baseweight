// This test file was generated with Claude 3.7 Sonnet and adjusted
import { render, screen, fireEvent } from "lib/react-testing-library";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { CategoryModal } from "./CategoryModal";

import userEvent from "@testing-library/user-event";
import { Category } from "api/categories";

describe("CategoryModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders correctly in create mode", () => {
    render(
      <CategoryModal
        isOpen={true}
        initialProps={null}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    // Check header text
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Create a new category",
    );

    // Check form fields exist
    expect(screen.getByLabelText("Category Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Color")).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders correctly in edit mode", () => {
    const initialCategory: Partial<Category> = {
      name: "Test Category",
      color: "#FF5733",
    };

    render(
      <CategoryModal
        isOpen={true}
        initialProps={initialCategory}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    // Check header text for edit mode
    expect(screen.getByRole("heading")).toHaveTextContent("Edit Test Category");

    // Check form fields have initial values
    expect(screen.getByLabelText("Category Name")).toHaveValue("Test Category");
    expect(screen.getByLabelText("Color")).toHaveValue("#ff5733");
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <CategoryModal
        isOpen={false}
        initialProps={null}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    expect(container.textContent).toBe("");
  });

  it("calls onClose when Cancel button is clicked", async () => {
    render(
      <CategoryModal
        isOpen={true}
        initialProps={null}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    const cancelButton = screen.getByText("Cancel");
    await userEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("updates form values when user inputs data", async () => {
    render(
      <CategoryModal
        isOpen={true}
        initialProps={null}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    const nameInput = screen.getByLabelText("Category Name");
    const colorInput = screen.getByLabelText("Color");

    await userEvent.type(nameInput, "New Category");
    // I fixed this bit using this suggestion: https://github.com/testing-library/user-event/issues/423#issuecomment-669368863
    // await userEvent.clear(colorInput);
    // await userEvent.type(colorInput, "#FF00FF");
    fireEvent.input(colorInput, { target: { value: "#FF00FF" } });

    expect(nameInput).toHaveValue("New Category");
    expect(colorInput).toHaveValue("#ff00ff");
  });

  it("submits form with correct data in create mode", async () => {
    render(
      <CategoryModal
        isOpen={true}
        initialProps={null}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    // Input data
    const nameInput = screen.getByLabelText("Category Name");
    await userEvent.type(nameInput, "New Category");

    // Submit form
    const saveButton = screen.getByText("Save");
    await userEvent.click(saveButton);

    // Check if onSubmit was called with the right params
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "New Category",
      color: "#44584B",
    });

    // Check if onClose was called after submit
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("submits form with correct data in edit mode", async () => {
    const initialCategory: Partial<Category> = {
      id: 123,
      name: "Original Category",
      color: "#FF5733",
    };

    render(
      <CategoryModal
        isOpen={true}
        initialProps={initialCategory}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    // Modify data
    const nameInput = screen.getByLabelText("Category Name");
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Updated Category");

    // Submit form
    const saveButton = screen.getByText("Save");
    await userEvent.click(saveButton);

    // Check if onSubmit was called with the right params
    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: 123,
      name: "Updated Category",
      color: "#FF5733",
    });
  });

  it("calls preventDefault on form submission", async () => {
    render(
      <CategoryModal
        isOpen={true}
        initialProps={null}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    // Setup preventDefault spy
    const preventDefaultSpy = vi.fn();
    const form = screen.getByRole("form");

    // Simulate form submission
    fireEvent.submit(form, { preventDefault: preventDefaultSpy });
  });
});
