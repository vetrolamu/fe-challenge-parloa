import { createRoot } from 'react-dom/client'
import 'index.css'
import CandidatesView from './components/App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<CandidatesView />)
