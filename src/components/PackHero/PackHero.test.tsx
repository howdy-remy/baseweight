import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "lib/react-testing-library";
import { PackHero } from "./PackHero";

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

describe("PackHero", () => {
  const originalCreateObjectURL = global.URL.createObjectURL;
  beforeEach(() => {
    global.URL.createObjectURL = vi.fn((url) => "blob:mock-url");
  });

  afterEach(() => {
    global.URL.createObjectURL = originalCreateObjectURL;
  });

  const onUpload = vi.fn();

  it("renders topo when no url is provided", async () => {
    render(<PackHero url={null} onUpload={onUpload} />);
    const image = await screen.findByAltText("topographic map pattern");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/topo.png");
  });

  it("renders image when url is provided", async () => {
    render(<PackHero url="image.png" onUpload={onUpload} />);
    const image = await screen.findByAltText("hero image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("blob:"));
  });
});
