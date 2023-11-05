const routes = jest.fn();
jest.mock("../src/endpoints/routes", ()=>({
  routes,
}))
import {startServer} from "../src/start-server"

test("express starts correctly", async ()=>{
  console.log = jest.fn();
  const server = await startServer();
  expect(routes).toHaveBeenCalled();
  const port = process.env.PORT && !isNaN(parseInt(process.env.PORT)) ? parseInt(process.env.PORT) : 3001;
  expect(console.log).toHaveBeenCalledWith(`app is listening on port ${port}`);
  server.close();
});

test("express starts in another port", async ()=>{
  console.log = jest.fn();
  process.env.PORT = "3002"
  const server = await startServer();
  expect(routes).toHaveBeenCalled();
  const port = process.env.PORT && !isNaN(parseInt(process.env.PORT)) ? parseInt(process.env.PORT) : 3001;
  expect(console.log).toHaveBeenCalledWith(`app is listening on port ${port}`);
  server.close();
});