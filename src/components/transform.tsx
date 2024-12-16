import { omit } from "lodash/fp"
import moment from "moment"
import { Candidate, CandidateData } from "../types"

const transform = (candidate: CandidateData) => {
  return {
    age: moment(new Date()).diff(candidate.dob, "years"),
    ...omit(["lair_address", "lair_secret_password"])(candidate),
  } as Candidate
}

export default transform