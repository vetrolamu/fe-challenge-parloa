import {useState, useEffect} from "react"

import Loading from "./Loading"
import transform from './transform'
import CandidatesList from "./CandidatesList"
import  CandidateSummaryTable from "./CandidateSummaryTable";
import { Candidate } from "../types";

const CandidatesView = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    fetch("http://localhost:3003/data", {
      headers: {
        cache: "no-store",
        "Cache-control": "no-cache"
      }
    })
      .then(res => res.json())
      .then(json => json.map(transform))
      .then((data) => setCandidates(data.filter((d: Candidate, i: number) => i < 1000)))
      .catch(e => console.error(e)); 
  }, [])

  if (candidates.length === 0) return <Loading />

  return (
    <main>
      <h1>Candidates list</h1>
      <CandidateSummaryTable candidateSummary={[
        { profession: 'Frontend Engineer', experienceAvg: 5, juniorCount: 1, midCount: 1, seniorCount: 1, totalCount: 3},
        { profession: 'Backend Engineer', experienceAvg: 8, juniorCount: 1, midCount: 1, seniorCount: 1, totalCount: 3},
      ]} />
      <CandidatesList candidates={candidates || []} />
    </main>
  )
}

export default CandidatesView
