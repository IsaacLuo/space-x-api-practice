import { startServer } from "../src/start-server";
import axios from "axios";

test("return 404 when address is wrong", async () => {
  process.env.PORT = "3010";
  const server = await startServer();
  try {
    await axios.get("http://localhost:3010/v1/wrongaddress");
  } catch (error) {
    expect(error.response.status).toBe(404);
  }
  server.close();
}, 5000);
