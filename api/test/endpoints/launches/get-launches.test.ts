import {getLaunches} from "../../../src/endpoints/launches/get-launches"
import axios, {AxiosResponse, AxiosHeaders} from "axios";
import {MOCKED_UPSTREAM_RESPONSE_DATA} from "./mocked-upstream-response-data"
import * as populateOneFieldModule from "../../../src/libs/launch-helpers/populate-one-field";

jest.spyOn(axios, 'post').mockImplementation(async (url:string):Promise<AxiosResponse<any,any>>=>{
  const mockedResult = MOCKED_UPSTREAM_RESPONSE_DATA[url as keyof typeof MOCKED_UPSTREAM_RESPONSE_DATA]
  if(mockedResult) {
    return {
      data: mockedResult,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {headers:new AxiosHeaders({'Content-Type': "application/json"})},
    }
  }
  throw new Error(`No mocked response for ${url}`);
});
jest.spyOn(console, 'error').mockImplementation((()=>{}))

test("populated twice", async ()=>{
  const mockedRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  jest.spyOn(populateOneFieldModule, "populateOneField").mockImplementation(jest.fn())
  await getLaunches({query:{}} as any, mockedRes as any);
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(populateOneFieldModule.populateOneField).toHaveBeenCalledTimes(2);
});

test("catch populate error", async ()=>{
  const mockedRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  jest.spyOn(populateOneFieldModule, "populateOneField").mockImplementation(()=>{throw new Error();})
  await getLaunches({query:{}} as any, mockedRes as any);
  expect(mockedRes.status).toHaveBeenCalledWith(500)
});

test("catch axios error", async ()=>{
  const mockedRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  jest.spyOn(axios, 'post').mockRejectedValueOnce({response:{
    data: null,
    status: 404,
    statusText: "Not Found",
    headers: {},
    config: {headers:new AxiosHeaders({'Content-Type': "application/json"})},
  }})
  
  await getLaunches({query:{}} as any, mockedRes as any);
  expect(mockedRes.status).toHaveBeenCalledWith(500)
  
});