import React from 'react';

const BenchmarkContext = React.createContext({ 
    benchmarks: {},
    rerenderTimestamp: 0,
    setBenchmarks: () => {},
    setRerenderTimestamp: () => {}
});

export default BenchmarkContext