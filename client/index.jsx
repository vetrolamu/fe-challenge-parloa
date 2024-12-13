import React from "react"
import BenchmarkContextContainer from "./benchmarks/BenchmarkContextContainer";
import CandidatesView from "./components/CandidatesView";
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

const App = () => {
  return (
    <BenchmarkContextContainer>
      <CandidatesView/>
    </BenchmarkContextContainer>
  )
}

root.render(<App />)
