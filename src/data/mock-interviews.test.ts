import { describe, expect, it } from "vitest";
import { pickRandomQuestions, getMockTrackBank, mockTrackBanks } from "@/data/mock-interviews";

describe("mock interview tracks", () => {
  it("has a question bank for every internship track", () => {
    expect(mockTrackBanks.length).toBeGreaterThanOrEqual(12);
    for (const track of mockTrackBanks) {
      expect(track.questions.length).toBeGreaterThanOrEqual(8);
    }
  });

  it("returns a random subset for a selected track", () => {
    const slug = "frontend-development";
    const a = pickRandomQuestions(slug, "intermediate");
    const b = pickRandomQuestions(slug, "intermediate");
    expect(a.length).toBeGreaterThan(0);
    expect(b.length).toBeGreaterThan(0);
    expect(getMockTrackBank(slug)?.title).toMatch(/frontend/i);
  });
});
