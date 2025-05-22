import "vitest-fetch-mock";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import CandidatesView, { summarizeCandidates } from "./CandidatesView";
import { CandidateData, ExperienceLevel } from "types";

vi.setSystemTime(new Date("2024-01-01"));

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
  {
    id: "123",
    name: "Mike Townsend",
    address: "-",
    profession: "Engineering Manager",
    experience: 60,
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

  it("should filter by profession", async () => {
    render(<CandidatesView />);

    const hendersonCandidate = await screen.findByText("Henderson Satterfield");
    const mikeCandidate = await screen.findByText("Mike Townsend");

    expect(hendersonCandidate).toBeInTheDocument();
    expect(mikeCandidate).toBeInTheDocument();

    const managerButton = await screen.findByRole("button", {
      name: "Engineering Manager",
    });

    managerButton.click();

    const hendersonCandidateAfterFilter = await screen.findByText(
      "Henderson Satterfield",
    );
    const mikeCandidateAfterFilter = await screen.findByText("Mike Townsend");

    expect(hendersonCandidateAfterFilter).not.toBeInTheDocument();
    expect(mikeCandidateAfterFilter).toBeInTheDocument();
  });
});

describe("summarizeCandidates", () => {
  it("Accepts empty input", async () => {
    expect(summarizeCandidates([])).toEqual([
      {
        profession: "All",
        experienceAvg: 0,
        juniorCount: 0,
        midCount: 0,
        seniorCount: 0,
        totalCount: 0,
      },
    ]);
  });
  it("Accepts single candidate", async () => {
    expect(
      summarizeCandidates([
        {
          id: "PPAF8OJP",
          name: "Henderson Satterfield",
          address: "42063 Lonnie Pike, South Chanelleton, 75462-8477",
          profession: "Frontend Engineer",
          experience: 6,
          level: ExperienceLevel.Mid,
          image: "http://localhost:3003/images/Dwarf.png",
          dateOfBirth: "1984-12-19",
          age: 39,
        },
      ]),
    ).toEqual([
      {
        profession: "All",
        experienceAvg: 6,
        juniorCount: 0,
        midCount: 1,
        seniorCount: 0,
        totalCount: 1,
      },
      {
        profession: "Frontend Engineer",
        experienceAvg: 6,
        juniorCount: 0,
        midCount: 1,
        seniorCount: 0,
        totalCount: 1,
      },
    ]);
  });
});
