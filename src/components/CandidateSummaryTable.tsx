export type CandidateSummaryData = {
  profession: string;
  experienceAvg: number;
  juniorCount: number;
  midCount: number;
  seniorCount: number;
  totalCount: number;
};

type CandidateSummaryTableProps = {
  candidateSummary: CandidateSummaryData[];
  onProfessionClick: (profession: string) => void;
};

const CandidateSummaryTable = ({
  candidateSummary = [],
  onProfessionClick,
}: CandidateSummaryTableProps) => {
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
        {candidateSummary.map(
          ({
            profession,
            experienceAvg,
            juniorCount,
            midCount,
            seniorCount,
            totalCount,
          }) => {
            return (
              <tr key={profession}>
                <td>
                  <button onClick={() => onProfessionClick(profession)}>
                    {profession}
                  </button>
                </td>
                <td className="number">{juniorCount}</td>
                <td className="number">{midCount}</td>
                <td className="number">{seniorCount}</td>
                <td className="number">{totalCount}</td>
                <td className="number">{experienceAvg}</td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};

export default CandidateSummaryTable;
