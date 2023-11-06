import { startServer } from "../src/start-server";
import axios from "axios";

test("/v1/launches returns as expected", async ()=>{
  process.env.PORT = "3011";
  const server = await startServer();
  let result = await axios.get("http://localhost:3011/v1/launches");
  expect(result.status).toBe(200);
  expect(result.data.results).toBeTruthy();
  expect(result.data.results.length).toBeGreaterThanOrEqual(1)
  server.close();
});