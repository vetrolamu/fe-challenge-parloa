import { useState, useEffect } from "react";
import moment from "moment";

import Loading from "./Loading";
import CandidatesList from "./CandidatesList";
import CandidateSummaryTable from "./CandidateSummaryTable";
import { Candidate, CandidateData } from "../types";

const CandidatesView = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

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
      })
      .catch((e) => console.error(e));
  }, []);

  if (candidates.length === 0) return <Loading />;

  return (
    <main>
      <h1>Candidates list</h1>
      <CandidateSummaryTable
        candidateSummary={[
          {
            profession: "Frontend Engineer",
            experienceAvg: 5,
            juniorCount: 1,
            midCount: 1,
            seniorCount: 1,
            totalCount: 3,
          },
          {
            profession: "Backend Engineer",
            experienceAvg: 8,
            juniorCount: 1,
            midCount: 1,
            seniorCount: 1,
            totalCount: 3,
          },
        ]}
      />
      <CandidatesList candidates={candidates || []} />
    </main>
  );
};

export default CandidatesView;
