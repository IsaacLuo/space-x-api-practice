import { startServer } from "../src/start-server";
import axios from "axios";

test("/v1/launches returns correct data", async () => {
  process.env.PORT = "3021";
  const server = await startServer();
  let result = await axios.get("http://localhost:3021/api/v1/launches");
  const {data} = result;
  expect(data.results).toBeDefined();
  expect(data.results).toHaveLength(10);
  for(const launch of data.results) {
    expect(launch.id).toBeDefined();
    expect(typeof launch.id).toBe("string");
    expect(launch.launchName).toBeDefined();
    expect(typeof launch.launchName).toBe("string");
    expect(launch.rocketName).toBeDefined();
    expect(typeof launch.rocketName).toBe("string");
    expect(launch.launchpadName).toBeDefined();
    expect(typeof launch.launchpadName).toBe("string");
    expect(launch.details).toBeDefined();
    expect(["string","object"]).toContain(typeof launch.details);
    expect(launch.date).toBeDefined();
    expect(new Date(launch.date).valueOf()).not.toBeNaN();
    expect(launch.success).toBeDefined();
    expect(typeof launch.success).toBe("boolean");
  }
  server.close();
});
