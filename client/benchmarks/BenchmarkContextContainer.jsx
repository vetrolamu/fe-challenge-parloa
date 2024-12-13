import React, {useState} from 'react';
import BenchmarkContext from './BenchmarkContext';
import BenchmarkPanel from './BenchmarkPanel';

const BenchmarkContextContainer = ({children}) => {
    const [benchmarks, setBenchmarks] = useState(JSON.parse(localStorage.getItem("benchmarks") || "{}"));
    const [rerenderTimestamp, setRerenderTimestamp] = useState(null);
    return <BenchmarkContext.Provider value={{ benchmarks, rerenderTimestamp, setBenchmarks, setRerenderTimestamp }}>
        <BenchmarkPanel/>
        {children}
    </BenchmarkContext.Provider>
}

export default BenchmarkContextContainer