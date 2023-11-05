import {Request, Response} from "express";

export async function getLaunches(req:Request, res:Response) {
  console.debug(req);
  res.status(201).send("not implemented yet");
}