import "vitest-fetch-mock";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import CandidatesView from "./CandidatesView";
import { CandidateData, ExperienceLevel } from "types";

const candidates: CandidateData[] = [
  {
    id: "PPAF8OJP",
    name: "Henderson Satterfield",
    address: "42063 Lonnie Pike, South Chanelleton, 75462-8477",
    profession: "Frontend Engineer",
    experience: 6,
    level: ExperienceLevel.Mid,
    image: "http://localhost:3003/images/Dwarf.png",
    dateOfBirth: "1984-12-19",
  },
];

describe("candidates table", () => {
  beforeEach(() => {
    fetchMock.doMock();
    fetchMock.mockResponseOnce(JSON.stringify(candidates));
  });

  afterEach(() => {
    cleanup();
  });

  it("should load the candidates table and show the character details", async () => {
    render(<CandidatesView />);
    const row = await screen.findByTestId(`candidate-row-${candidates[0].id}`);
    expect(row).toHaveTextContent("Henderson Satterfield");
    expect(row).toHaveTextContent("Mid Level");
    expect(row).toHaveTextContent("39yrs");
  });
});
