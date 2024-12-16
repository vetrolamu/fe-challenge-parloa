import { useRef, useContext } from 'react'
import { omit } from 'lodash/fp'
import { v4 as uuid } from 'uuid';
import BenchmarkContext, { BenchmarkRecord, BenchmarkContextType } from './BenchmarkContext'

type BenchmarkTimestamps = {
  request: number,
  parse: number,
  transform: number,
  render: number,
  end: number
}

const createBenchmarkTimestamps = (): BenchmarkTimestamps => ({
  request: 0,
  parse: 0,
  transform: 0,
  render: 0,
  end: 0
})

const useBenchmarks = () => {
  const { benchmarks, setBenchmarks, rerenderTimestamp, setRerenderTimestamp} = useContext<BenchmarkContextType>(BenchmarkContext)

  const ref = useRef<BenchmarkTimestamps>(createBenchmarkTimestamps());
  const setTimestamp = (key: keyof BenchmarkTimestamps) => {
    ref.current[key] = Date.now();
  }
  
  const createBenchmark = (timestamps: BenchmarkTimestamps) => {
    const id = uuid().substring(0, 8);
    const benchmark = {
      id,
      title: "Test " + id,
      request: timestamps.parse - timestamps.request,
      parse: timestamps.transform - timestamps.parse,
      transform: timestamps.render - timestamps.transform,
      render: timestamps.end - timestamps.render,
    }
    const benchmarksWithNewBenchmark = { ...benchmarks, [id]: benchmark }
    localStorage.setItem("benchmarks", JSON.stringify(benchmarksWithNewBenchmark))
    setBenchmarks(benchmarksWithNewBenchmark)
    return benchmarksWithNewBenchmark
  }

  const updateBenchmarkById = (id: string, updates: Partial<Omit<BenchmarkRecord, 'id'>>) => {
    const benchmark = benchmarks[id]
    if (!benchmark) return
    setBenchmarks({
      ...benchmarks,
      [id]: {...benchmark, ...updates}
    })
  }

  const clearBenchmarkById = (id: string) => {
    const benchmarksWithRemovedBenchmark = omit(id, benchmarks)
    localStorage.setItem("benchmarks", JSON.stringify(benchmarksWithRemovedBenchmark))
    setBenchmarks(benchmarksWithRemovedBenchmark);
    return benchmarks
  }

  const clearAll = () => {
    localStorage.clear()
    setBenchmarks({})
  }

  return {
    // data
    benchmarks,
    
    // lifecycle functions
    benchmarkRequest: () => setTimestamp('request'),
    benchmarkParsing: () => setTimestamp('parse'),
    benchmarkTransform: () => setTimestamp('transform'),
    benchmarkRender: () => setTimestamp('render'),
    benchmarkEnd: () => {
      if (ref.current.request === 0) return;
      createBenchmark({ ...ref.current, end: Date.now() })
      ref.current = createBenchmarkTimestamps()
    },
    
    // helper functions
    clearAll,
    clearBenchmarkById,
    updateBenchmarkById,

    // rerender helpers
    rerenderTimestamp,
    forceRerender: () => setRerenderTimestamp(Date.now())
  }
}

export default useBenchmarks