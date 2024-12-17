import { omit } from "lodash/fp"
import moment from "moment"
import { Candidate, CandidateData } from "../types"

const transform = (candidate: CandidateData) => {
  return {
    age: moment(new Date()).diff(candidate.dateOfBirth, "years"),
    ...omit(["address"])(candidate),
  } as Candidate
}

export default transform