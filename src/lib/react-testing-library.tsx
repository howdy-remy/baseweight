import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";

const customRender: (
  children: ReactNode,
  options?: RenderOptions,
) => RenderResult = (children, options) =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>, options);

// Re-export everything
export * from "@testing-library/react";
// Override render method
export { customRender as render };
