import express from "express";
import { routes } from "./endpoints/routes";
import { Server } from "http";

/**
 * Starts Express.js server
 * @returns http server instance
 */
export async function startServer(): Promise<Server> {
  return new Promise((resolve: (server: Server) => void) => {
    const app = express();
    const port =
      process.env.PORT && !isNaN(parseInt(process.env.PORT))
        ? parseInt(process.env.PORT)
        : 3001;

    routes(app);

    // Didn't handle errors here because It can throw exceptions to runtime
    // use nodemon to handle the errors.
    const server = app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
      resolve(server);
    });
  });
}
