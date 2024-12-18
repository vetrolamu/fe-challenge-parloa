import { sumBy } from "lodash/fp"

type CandidateSummaryData = {
  profession: string,
  experienceAvg: number,
  juniorCount: number,
  midCount: number,
  seniorCount: number,
  totalCount: number
}

type CandidateSummaryTableProps = {
  candidateSummary: CandidateSummaryData[]
}

const CandidateSummaryTable = ({ candidateSummary = [] }: CandidateSummaryTableProps) => {
  const totalCandidates = sumBy("totalCount")(candidateSummary)
  return (
    <table className="candidateSummary">
      <thead>
        <tr>
          <th>Profession</th>
          <th className="number">Junior</th>
          <th className="number">Mid</th>
          <th className="number">Senior</th>
          <th className="number">All</th>
          <th className="number">Exp. Avg</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>All</td>
          <td className="number">{Math.round(sumBy("juniorCount")(candidateSummary) / totalCandidates)}</td>
          <td className="number">{Math.round(sumBy("midCount")(candidateSummary) / totalCandidates)}</td>
          <td className="number">{Math.round(sumBy("seniorCount")(candidateSummary) / totalCandidates)}</td>
          <td className="number">{totalCandidates}</td>
          <td className="number">{Math.round(sumBy("experienceAvg")(candidateSummary) / totalCandidates)}</td>
        </tr>
        {candidateSummary.map(({ profession, experienceAvg, juniorCount, midCount, seniorCount, totalCount }) => {
          return (
            <tr key={profession}>
              <td>{profession}</td>
              <td className="number">{juniorCount}</td>
              <td className="number">{midCount}</td>
              <td className="number" >{seniorCount}</td>
              <td className="number">{totalCount}</td>
              <td className="number">{experienceAvg}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default CandidateSummaryTable