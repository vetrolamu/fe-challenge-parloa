import { useRef, useContext } from 'react'
import { omit } from 'lodash/fp'
import uuid from 'uuid'
import BenchmarkContext from './BenchmarkContext'

const createTimestamps = () => ({
    request: 0,
    parse: 0,
    transform: 0,
    render: 0,
})

const useBenchmarks = () => {
  const { benchmarks, setBenchmarks, rerenderTimestamp, setRerenderTimestamp} = useContext(BenchmarkContext)

  const ref = useRef(createTimestamps());
  const setTimestamp = (key) => {
    ref.current[key] = Date.now();
  }
  
  const createBenchmark = (timestamps) => {
    const id = uuid()
    const benchmark = {
      id,
      title: "Test " + id.substr(0, 7),
      request: timestamps.parse - timestamps.request,
      parse: timestamps.transform - timestamps.parse,
      transform: timestamps.render - timestamps.transform,
      render: timestamps.end - timestamps.render,
    }
    const benchmarksWithNewBenchmark = { ...benchmarks, [id]: benchmark }
    localStorage.setItem("benchmarks", JSON.stringify(benchmarksWithNewBenchmark))
    setBenchmarks(benchmarksWithNewBenchmark)
    return benchmarks
  }

  const updateBenchmarkById = (id, updates) => {
    const benchmark = benchmarks[id]
    if (!benchmark) return
    setBenchmarks({
      ...benchmarks,
      [id]: {...benchmark, ...updates}
    })
  }

  const clearBenchmarkById = (id) => {
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
      createBenchmark({ ...ref.current, end: Date.now() })
      ref.current = createTimestamps()
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