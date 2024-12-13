import React from "react"

const CandidatesTable = ({ candidates }) => {
  return (
    <table data-testid="candidate-table">
      <thead>
        <tr>
          <th colSpan={2}>Candidate</th>
          <th>Race</th>
          <th>Class</th>
          <th className={"number"}>Level</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map(({ id, image, name, level, classname, race }) => {
          return (
            <tr key={id} data-testid={`candidate-row-${id}`}>
              <td>
                <img src={image} title={"Super accurate portrait of " + name} />
              </td>
              <td>{name}</td>
              <td>{race}</td>
              <td>{classname}</td>
              <td className={"number"}>{level}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default CandidatesTable
