import {Express, Request, Response} from "express";
import { getLaunches } from "./launches";

export function routes (app:Express) {
  app.get("/launches/", getLaunches);

  app.use((_:Request, res:Response)=>{
    res.status(404).send("Not found");
  })
}

