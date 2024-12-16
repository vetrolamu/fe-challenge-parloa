import {useState, useEffect} from "react"
import { tap } from 'lodash/fp';

import Loading from "./Loading"
import transform from './transform'
import useBenchmarks from "../benchmarks/useBenchmarks"
import CandidatesList from "./CandidatesList"
import  ClassInfoTable from "./ClassInfoTable";
import { Candidate } from "../types";

const CandidatesView = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const {
    benchmarkRequest, 
    benchmarkParsing,
    benchmarkTransform,
    benchmarkRender,
    benchmarkEnd,
    rerenderTimestamp
  } = useBenchmarks();

  useEffect(() => {
    benchmarkRequest() // benchmarking - ignore
    fetch("http://localhost:3003/data", {
      headers: {
        cache: "no-store",
        "Cache-control": "no-cache"
      }
    })
      .then(tap(benchmarkParsing)) // benchmarking - ignore
      .then(res => res.json())
      .then(tap(benchmarkTransform)) // benchmarking - ignore
      .then(json => json.map(transform))
      .then(tap(benchmarkRender)) // benchmarking - ignore
      .then((data) => setCandidates(data.filter((d: Candidate, i: number) => i < 1000)))
      .then(tap(benchmarkEnd)) // benchmarking - ignore
      .catch(e => console.error(e)); 
  }, [rerenderTimestamp])

  if (!candidates) return <Loading />

  return (
    <main>
      <h1>DnD Candidates</h1>
      <ClassInfoTable classInfo={[
        { classname: 'Fighter', count: 1, age: 1, height: 1, level: 1},
        { classname: 'Wizard', count: 1, age: 1, height: 1, level: 1}
      ]} />
      <CandidatesList candidates={candidates.filter((d,i) => i < 1000) || []} />
    </main>
  )
}

export default CandidatesView
