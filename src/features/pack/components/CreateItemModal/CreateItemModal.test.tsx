import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CreateItemModal } from "./CreateItemModal";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";

describe("CreateItemModal", () => {
  const onClose = vi.fn();
  const onSubmit = vi.fn();

  const renderComponent = (isOpen: boolean, initialType?: string) => {
    render(
      <ThemeProvider theme={theme}>
        <CreateItemModal
          categoryName="category"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          initialType={initialType}
        />
      </ThemeProvider>,
    );
  };

  it("should render the modal when isOpen is true", async () => {
    renderComponent(true);
    await waitFor(() => {
      expect(screen.getByText("Add Item")).toBeInTheDocument();
    });
  });

  it("should not render the modal when isOpen is false", () => {
    renderComponent(false);
    expect(screen.queryByText("Add Item")).not.toBeInTheDocument();
  });

  it("should call onClose when the modal is closed", async () => {
    renderComponent(true);
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("should call onSubmit with the correct values", async () => {
    renderComponent(true, "Initial Type");

    fireEvent.change(screen.getByPlaceholderText("type"), {
      target: { value: "New Type" },
    });
    fireEvent.change(screen.getByPlaceholderText("description"), {
      target: { value: "New Description" },
    });
    fireEvent.change(screen.getByPlaceholderText("weight"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("quantity"), {
      target: { value: "2" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add item/i })),
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          type: "New Type",
          description: "New Description",
          weightInGrams: 100,
          unit: "G",
          quantity: 2,
        });
      });
  });
});
