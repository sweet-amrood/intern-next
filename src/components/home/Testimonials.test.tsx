import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Testimonials } from "@/components/home/Testimonials";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Testimonials slider", () => {
  it("shows carousel controls", () => {
    render(<Testimonials />);
    expect(screen.getByLabelText(/student testimonials/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/previous testimonial/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next testimonial/i)).toBeInTheDocument();
  });

  it("updates active indicator when next is clicked", async () => {
    const user = userEvent.setup();
    render(<Testimonials />);
    const firstDot = screen.getByLabelText(/show testimonial 1/i);
    const secondDot = screen.getByLabelText(/show testimonial 2/i);
    expect(firstDot).toHaveAttribute("aria-current", "true");
    await user.click(screen.getByLabelText(/next testimonial/i));
    expect(secondDot).toHaveAttribute("aria-current", "true");
  });
});
