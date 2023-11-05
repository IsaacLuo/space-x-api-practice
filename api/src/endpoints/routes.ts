import express, {Request, Response} from "express";
import { getLaunches } from "./launches";

const app = express();
const port = 3000;

app.get("launch/", getLaunches);

app.use((_:Request, res:Response)=>{
  res.status(404).send("Not found");
})

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
})