import {URL_LAUNCHES_QUERY, URL_LAUNCHPADS_QUERY, URL_ROCKETS_QUERY} from "../src/upstream-urls";
import axios from "axios";
test("upstream is accessible", async()=>{
  let result = await axios.get(URL_LAUNCHES_QUERY);
  expect(result.status).toBe(200);

  result = await axios.post(URL_LAUNCHPADS_QUERY);
  expect(result.status).toBe(200);

  result = await axios.post(URL_ROCKETS_QUERY);
  expect(result.status).toBe(200);
})