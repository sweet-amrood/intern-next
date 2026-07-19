import { describe, expect, it } from "vitest";
import {
  countWords,
  isEmail,
  isPhonePK,
  validateContactForm,
  validateSignInForm,
  validateSignUpForm,
  validateInternshipApplyForm,
} from "@/lib/validate";

describe("validate helpers", () => {
  it("counts words correctly", () => {
    expect(countWords("  hello world  ")).toBe(2);
    expect(countWords("")).toBe(0);
  });

  it("validates email", () => {
    expect(isEmail("bad")).toMatch(/valid/i);
    expect(isEmail("student@internee.pk")).toBeNull();
  });

  it("validates Pakistani phone numbers", () => {
    expect(isPhonePK("03001234567")).toBeNull();
    expect(isPhonePK("123")).toMatch(/valid/i);
  });

  it("rejects incomplete contact forms", () => {
    const result = validateContactForm({
      name: "A",
      email: "bad",
      subject: "",
      message: "hi",
    });
    expect(result.ok).toBe(false);
    expect(result.errors.name || result.errors.email || result.errors.message).toBeTruthy();
  });

  it("accepts a complete contact form", () => {
    const result = validateContactForm({
      name: "Ali Khan",
      email: "ali@example.com",
      subject: "General inquiry",
      message: "I want to know more about the frontend internship track.",
    });
    expect(result.ok).toBe(true);
  });

  it("validates signup password match", () => {
    const result = validateSignUpForm({
      name: "Sara",
      email: "sara@example.com",
      password: "secret1",
      confirm: "secret2",
    });
    expect(result.ok).toBe(false);
    expect(result.errors.confirm).toMatch(/match/i);
  });

  it("validates sign-in fields", () => {
    const result = validateSignInForm({ email: "", password: "" });
    expect(result.ok).toBe(false);
  });

  it("validates internship apply phone and required fields", () => {
    const result = validateInternshipApplyForm({
      fullName: "Test User",
      email: "test@example.com",
      phone: "03001112233",
      university: "NED",
      address: "Karachi Street 1",
      semester: "6",
      city: "Karachi",
      portfolio: "notaurl",
    });
    expect(result.ok).toBe(false);
    expect(result.errors.portfolio).toMatch(/http/i);
  });
});
