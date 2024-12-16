import { sumBy } from "lodash/fp"

type ClassInfo = {
  classname: string,
  count: number,
  age: number,
  height: number
  level: number,
}

type ClassTableProps = {
  classInfo: ClassInfo[]
}

const ClassInfoTable = ({ classInfo = [] }: ClassTableProps) => {
  const totalCandidates = sumBy("count")(classInfo)
  return (
    <table className="classInfo">
      <thead>
        <tr>
          <th>Class</th>
          <th className="number">Count</th>
          <th className="number">Age</th>
          <th className="number">Height(cm)</th>
          <th className="number">Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>All</td>
          <td className="number">{totalCandidates}</td>
          <td className="number">{Math.round(sumBy("age")(classInfo) / totalCandidates)}</td>
          <td className="number">{Math.round(sumBy("height")(classInfo) / totalCandidates)}</td>
          <td className="number">{Math.round(sumBy("level")(classInfo) / totalCandidates)}</td>
        </tr>
        {classInfo.map(({ classname, count, age, height, level }) => {
          return (
            <tr key={classname}>
              <td>{classname}</td>
              <td className="number">{count}</td>
              <td className="number">{Math.round(age / count)}</td>
              <td className="number" >{Math.round(height / count)}</td>
              <td className="number">{Math.round(level / count)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ClassInfoTable