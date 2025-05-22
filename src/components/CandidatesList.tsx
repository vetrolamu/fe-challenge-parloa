import { Candidate } from "../types";

const CandidatesList = ({ candidates }: { candidates: Candidate[] }) => {
  return (
    <table data-testid="candidate-table">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Profession</th>
          <th>Level</th>
          <th className="number">Age</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map(({ id, profession, image, name, level, age }) => {
          return (
            <tr key={id} data-testid={`candidate-row-${id}`}>
              <td>
                <img src={image} title={"Super accurate portrait of " + name} />
              </td>
              <td>{name}</td>
              <td>{profession}</td>
              <td>{level}</td>
              <td className="number">{age}yrs</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CandidatesList;
