import React from 'react';

export type BenchmarkRecord = {
    id: string,
    title: string
    request: number
    parse: number
    transform: number
    render: number
}

export type BenchmarkContextType = {
    benchmarks: Record<string, BenchmarkRecord>
    rerenderTimestamp: number,
    setBenchmarks: (benchmarks: Record<string, BenchmarkRecord>) => void,
    setRerenderTimestamp: (newTimestamp: number) => void
}

const BenchmarkContext = React.createContext<BenchmarkContextType>({ 
    benchmarks: {},
    rerenderTimestamp: 0,
    setBenchmarks: () => {},
    setRerenderTimestamp: () => {}
});

export default BenchmarkContext