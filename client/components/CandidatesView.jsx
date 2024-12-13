import React, {useState, useEffect} from "react"
import { tap } from 'lodash/fp';

import CandidatesTable from "./CandidatesTable"
import Loading from "./Loading"
import transform from './transform'
import useBenchmarks from "../benchmarks/useBenchmarks"
import ClassTable from "./ClassTable";

const CandidatesView = () => {
  const [data, setData] = useState(null);

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
      .then(data => setData(data.filter((d,i) => i < 1000)))
      .then(tap(benchmarkEnd)) // benchmarking - ignore
      .catch(e => console.error(e)); 
  }, [rerenderTimestamp])

  if (!data) return <Loading />

  return (
    <main>
      <h1>DnD Candidates</h1>
      <ClassTable classStats={[
        { name: 'Fighter', count: 10, strength: 16, dexterity: 10, constitution: 14, wisdom: 10, intelligence: 10, charisma: 12 },
        { name: 'Barbarian', count: 5, strength: 16, dexterity: 14, constitution: 16, wisdom: 8, intelligence: 8, charisma: 12 },
      ]}/>
      <CandidatesTable candidates={data.filter((d,i) => i < 1000) || []} />
    </main>
  )
}

export default CandidatesView
