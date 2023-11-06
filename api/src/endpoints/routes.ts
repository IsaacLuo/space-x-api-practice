import {Express, Request, Response} from "express";
import { getLaunches } from "./launches";

/**
 * express.js main routes
 * @param app express instance
 */
export function routes (app:Express) {
  app.get("/v1/launches/", getLaunches);

  // always response the root path
  app.get("/", (_:Request, res:Response)=>{
    res.send({message: "Space X API Practice v1"})
  })

  app.use((_:Request, res:Response)=>{
    res.status(404).send({message: "Not found"});
  })
}

