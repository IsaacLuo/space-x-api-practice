import {Request, Response} from "express";

export function getLaunches(req:Request, res:Response) {
  console.debug(req);
  res.status(501).send("not implemented yet");
}