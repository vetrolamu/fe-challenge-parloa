import {PropsWithChildren, useState} from 'react';
import BenchmarkContext from './BenchmarkContext';
import BenchmarkPanel from './BenchmarkPanel';

const BenchmarkContextContainer = ({children}: PropsWithChildren) => {
    const [benchmarks, setBenchmarks] = useState(JSON.parse(localStorage.getItem("benchmarks") || "{}"));
    const [rerenderTimestamp, setRerenderTimestamp] = useState<number>(0);
    return <BenchmarkContext.Provider value={{
        benchmarks,
        rerenderTimestamp,
        setBenchmarks,
        setRerenderTimestamp
    }}>
        <BenchmarkPanel/>
        {children}
    </BenchmarkContext.Provider>
}

export default BenchmarkContextContainer