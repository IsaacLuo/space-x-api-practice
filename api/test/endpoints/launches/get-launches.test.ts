import {getLaunches} from "../../../src/endpoints/launches/get-launches"
import axios, {AxiosResponse, AxiosHeaders} from "axios";
jest.spyOn(axios, 'post').mockImplementation(async (url:string):Promise<AxiosResponse<any,any>>=>{
  switch(url) {
    case URL_LAUNCHES_QUERY: {
      return {
        data: {} as any,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {headers:new AxiosHeaders({'Content-Type': "application/json"})},
      }
    }
    default:
      throw new Error();
  }
});
import { URL_LAUNCHES_QUERY } from "../../../src/upstream-urls";
test("queried upstreams", async ()=>{
  const mockedRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  getLaunches({} as any, mockedRes as any);
  expect(axios.post).toHaveBeenCalledTimes(3);
  const port = process.env.PORT && !isNaN(parseInt(process.env.PORT)) ? parseInt(process.env.PORT) : 3001;
  expect(console.log).toHaveBeenCalledWith(`app is listening on port ${port}`);
});