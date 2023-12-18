import { Missions } from "./mission";
import { Ships } from "./ships";


const apiCalls = {
  queries: {
    ...Ships.query,
    ...Missions.query,
  },
  mutations: {
    ...Ships.mutations,
    ...Missions.mutations,
  },
};

export default apiCalls;
