import React from "react"
import { sumBy } from "lodash/fp"

export default ({ classStats = [], onClick }) => {
  const totalCandidates = sumBy("count")(classStats)
  return (
    <table className="classStats">
      <thead>
        <tr>
          <th>Class</th>
          <th># Candidates</th>
          <th>Str</th>
          <th>Dex</th>
          <th>Con</th>
          <th>Int</th>
          <th>Wis</th>
          <th>Cha</th>
          <th>Avg</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>All</td>
          <td>{totalCandidates}</td>
          <td>{Math.round(sumBy("strength")(classStats) / totalCandidates)}</td>
          <td>{Math.round(sumBy("dexterity")(classStats) / totalCandidates)}</td>
          <td>{Math.round(sumBy("constitution")(classStats) / totalCandidates)}</td>
          <td>{Math.round(sumBy("wisdom")(classStats) / totalCandidates)}</td>
          <td>{Math.round(sumBy("intelligence")(classStats) / totalCandidates)}</td>
          <td>{Math.round(sumBy("charisma")(classStats) / totalCandidates)}</td>
          <td>{Math.round(sumBy("average")(classStats) / totalCandidates)}</td>
        </tr>
        {classStats.map(({  count, name, strength, dexterity, constitution, wisdom, intelligence, charisma, average }) => {
          return (
            <tr key={name}>
              <td>{name}</td>
              <td>{count}</td>
              <td>{Math.round(strength / count)}</td>
              <td>{Math.round(dexterity / count)}</td>
              <td>{Math.round(constitution / count)}</td>
              <td>{Math.round(wisdom / count)}</td>
              <td>{Math.round(intelligence / count)}</td>
              <td>{Math.round(charisma / count)}</td>
              <td>{Math.round(average / count)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
