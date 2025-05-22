import { useState, useEffect, useMemo } from "react";
import moment from "moment";

import Loading from "./Loading";
import CandidatesList from "./CandidatesList";
import CandidateSummaryTable, {
  type CandidateSummaryData,
} from "./CandidateSummaryTable";
import { Candidate, CandidateData, ExperienceLevel } from "../types";
import { groupBy, map, pipe, sumBy } from "lodash/fp";

const summarizeGroup = ([profession, items]: [string, Candidate[]]) => {
  const totalExperience = sumBy("experience")(items) || 0;

  return {
    profession,
    experienceAvg: totalExperience ? totalExperience / items.length : 0,
    juniorCount: items.filter(
      (item: Candidate) => item.level === ExperienceLevel.Junior,
    ).length,
    midCount: items.filter(
      (item: Candidate) => item.level === ExperienceLevel.Mid,
    ).length,
    seniorCount: items.filter(
      (item: Candidate) => item.level === ExperienceLevel.Senior,
    ).length,
    totalCount: items.length,
  };
};

export const summarizeCandidates = (
  candidates: Candidate[],
): CandidateSummaryData[] => {
  const group = groupBy("profession")(candidates);
  const result = pipe(Object.entries, map(summarizeGroup))(group);

  return [summarizeGroup(["All", candidates]), ...result];
};

const applyFilter = (
  candidates: Candidate[],
  professionFilter: string,
): Candidate[] => {
  if (professionFilter === "All") {
    return candidates;
  }

  return candidates.filter(
    (candidate) => candidate.profession === professionFilter,
  );
};

const useCandidates = (): {
  candidates: Candidate[];
  summary: CandidateSummaryData[];
  setProfessionFilter: (value: string) => void;
  loading: boolean;
} => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [summary, setSummary] = useState<CandidateSummaryData[]>([]);
  const [professionFilter, setProfessionFilter] = useState<string>("All");
  const filteredCandidates = useMemo(
    () => applyFilter(candidates, professionFilter),
    [professionFilter, candidates],
  );

  useEffect(() => {
    fetch("http://localhost:3003/data", {
      headers: {
        cache: "no-store",
        "Cache-control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data: CandidateData[]) => {
        const dataWithAge: Candidate[] = data.map(
          (candidate: CandidateData) => ({
            ...candidate,
            age: moment(new Date()).diff(candidate.dateOfBirth, "years"),
          }),
        );

        setCandidates(dataWithAge);
        setSummary(summarizeCandidates(dataWithAge));
      })
      .catch((e) => console.error(e));
  }, []);

  return {
    candidates: filteredCandidates || [],
    summary,
    setProfessionFilter,
    loading: candidates.length === 0,
  };
};

const CandidatesView = () => {
  const { candidates, summary, setProfessionFilter, loading } = useCandidates();
  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <h1>Candidates list</h1>
      <CandidateSummaryTable
        candidateSummary={summary}
        onProfessionClick={setProfessionFilter}
      />
      <CandidatesList candidates={candidates || []} />
    </main>
  );
};

export default CandidatesView;
