import 'index.css'
import BenchmarkContextContainer from 'benchmarks/BenchmarkContextContainer';
import CandidatesView from 'components/CandidatesView';

const App = () => {
    return <BenchmarkContextContainer>
        <CandidatesView />
    </BenchmarkContextContainer>
}

export default App