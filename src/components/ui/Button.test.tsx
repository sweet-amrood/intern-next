import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/Button";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Apply now</Button>);
    expect(screen.getByRole("button", { name: /apply now/i })).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });

  it("fires click handler when enabled", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Continue
      </Button>,
    );
    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(clicked).toBe(true);
  });

  it("renders link variant when href is provided", () => {
    render(<Button href="/internship">Browse</Button>);
    expect(screen.getByRole("link", { name: /browse/i })).toHaveAttribute(
      "href",
      "/internship",
    );
  });
});
