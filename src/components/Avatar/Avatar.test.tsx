import { describe, expect, it, vi } from "vitest";
import { render, screen } from "lib/react-testing-library";
import { Avatar } from "./Avatar";

vi.mock("lib/supabaseClient", () => ({
  supabase: {
    storage: {
      from: () => ({
        download: vi.fn().mockResolvedValue({
          data: new Blob(["image data"], { type: "image/png" }),
          error: null,
        }),
      }),
    },
  },
}));

describe.skip("Avatar", () => {
  it("renders initial when no url is provided", () => {
    render(<Avatar initial="R" size={50} url={null} />);
    expect(screen.getByText("R")).toBeInTheDocument();
  });

  it("renders image when url is provided", async () => {
    render(<Avatar initial="R" size={50} url="path/to/image.png" />);
    const image = await screen.findByAltText("Avatar");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("blob:"));
  });

  it("renders default initial when no initial is provided", () => {
    render(<Avatar size={50} url={null} />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });
});
