// This test file was generated with Claude Sonnet 3.5 and adjusted
import { render, screen, fireEvent, waitFor } from "lib/react-testing-library";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useCreateCategoryMutation } from "api/categories";
import { CreateCategoryModal } from "./CreateCategoryModal";

// Mock the API hook
vi.mock("api/categories", () => ({
  useCreateCategoryMutation: vi.fn(),
}));

// Mock the Modal and Button components
vi.mock("components/Modal", () => ({
  Modal: ({
    children,
    isOpen,
  }: {
    children: React.ReactNode;
    isOpen: boolean;
  }) => (isOpen ? <div data-testid="modal">{children}</div> : null),
  ActionsWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("components/Button", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

describe("CreateCategoryModal", () => {
  const mockRefetch = vi.fn();
  const mockCreateCategory = vi.fn();
  const defaultProps = {
    packId: "123",
    nextOrder: 1,
    refetch: mockRefetch,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default mock implementation
    (useCreateCategoryMutation as any).mockReturnValue([mockCreateCategory]);
  });

  it('renders the "Add category" button', () => {
    render(<CreateCategoryModal {...defaultProps} />);
    expect(screen.getByText("Add category")).toBeInTheDocument();
  });

  it('opens modal when "Add category" button is clicked', () => {
    render(<CreateCategoryModal {...defaultProps} />);

    // Modal should not be visible initially
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();

    // Click the button
    fireEvent.click(screen.getByText("Add category"));

    // Modal should be visible
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("renders form fields with default values", () => {
    render(<CreateCategoryModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Add category"));

    const nameInput = screen.getByLabelText(
      "Category Name",
    ) as HTMLInputElement;
    const colorInput = screen.getByLabelText("Color") as HTMLInputElement;

    expect(nameInput.value).toBe("");
    expect(colorInput.value).toBe("#44584b");
  });

  it("updates form values when user types", () => {
    render(<CreateCategoryModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Add category"));

    const nameInput = screen.getByLabelText("Category Name");
    const colorInput = screen.getByLabelText("Color");

    fireEvent.change(nameInput, { target: { value: "Test Category" } });
    fireEvent.change(colorInput, { target: { value: "#ff0000" } });

    expect((nameInput as HTMLInputElement).value).toBe("Test Category");
    expect((colorInput as HTMLInputElement).value).toBe("#ff0000");
  });

  it("calls createCategory with correct values when form is submitted", async () => {
    render(<CreateCategoryModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Add category"));

    // Fill in the form
    fireEvent.change(screen.getByLabelText("Category Name"), {
      target: { value: "Test Category" },
    }),
      fireEvent.change(screen.getByLabelText("Color"), {
        target: { value: "#ff0000" },
      }),
      // Submit the form
      fireEvent.submit(screen.getByRole("form"));

    // Verify createCategory was called with correct arguments
    await waitFor(() => {
      expect(mockCreateCategory).toHaveBeenCalledWith({
        name: "Test Category",
        color: "#ff0000",
        pack_id: "123",
      });
    });
  });

  it("closes modal and calls refetch after successful submission", async () => {
    render(<CreateCategoryModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Add category"));

    // Fill and submit form
    fireEvent.change(screen.getByLabelText("Category Name"), {
      target: { value: "Test Category" },
    });
    fireEvent.submit(screen.getByRole("form"));

    // Wait for async operations to complete
    await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it("does not submit if packId is not provided", async () => {
    render(<CreateCategoryModal nextOrder={1} refetch={mockRefetch} />);
    fireEvent.click(screen.getByText("Add category"));

    // Fill and submit form
    fireEvent.change(screen.getByLabelText("Category Name"), {
      target: { value: "Test Category" },
    });
    fireEvent.submit(screen.getByRole("form"));

    expect(mockCreateCategory).not.toHaveBeenCalled();
  });
});
