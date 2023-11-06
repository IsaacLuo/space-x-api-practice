import { populateOneField } from "../../../src/libs/launch-helpers/populate-one-field";
import axios, { AxiosHeaders, AxiosResponse } from "axios";
import { URL_LAUNCHPADS_QUERY } from "../../../src/upstream-urls";

test("populate launchpadName", async () => {
  jest
    .spyOn(axios, "post")
    .mockImplementationOnce(async (): Promise<AxiosResponse<any, any>> => {
      return {
        data: {
          docs: [
            {
              name: "CCSFS SLC 40",
              id: "5e9e4501f509094ba4566f84",
            },
            {
              name: "Kwajalein Atoll",
              id: "5e9e4502f5090995de566f86",
            },
          ],
          totalDocs: 2,
          offset: 0,
          limit: 10,
          totalPages: 1,
          page: 1,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          headers: new AxiosHeaders({ "Content-Type": "application/json" }),
        },
      };
    });
  const testDoc: any = {
    docs: [
      {
        rocket: "5e9d0d95eda69955f709d1eb",
        success: false,
        details: "Engine failure at 33 seconds and loss of vehicle",
        launchpad: "5e9e4502f5090995de566f86",
        name: "FalconSat",
        date_utc: "2006-03-24T22:30:00.000Z",
        id: "5eb87cd9ffd86e000604b32a",
      },
      {
        rocket: "5e9d0d95eda69955f709d1eb",
        success: false,
        details:
          "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
        launchpad: "5e9e4502f5090995de566f86",
        name: "DemoSat",
        date_utc: "2007-03-21T01:10:00.000Z",
        id: "5eb87cdaffd86e000604b32b",
      },
    ],
    totalDocs: 205,
    offset: 0,
    limit: 2,
    totalPages: 103,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: 2,
  };
  await populateOneField(testDoc, "launchpad", URL_LAUNCHPADS_QUERY);
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(testDoc.docs[0].launchpadName).toBeDefined();
  expect(testDoc.docs[1].launchpadName).toBeDefined();
});

test("throws when id doesn't match", async () => {
  jest
    .spyOn(axios, "post")
    .mockImplementationOnce(async (): Promise<AxiosResponse<any, any>> => {
      return {
        data: {
          docs: [
            {
              name: "CCSFS SLC 40",
              id: "5e9d0d95eda69955f709d1eb",
            },
            {
              name: "CCSFS SLC 41",
              id: "5e9d0d95eda69955f709d1ec",
            },
          ],
          totalDocs: 2,
          offset: 0,
          limit: 10,
          totalPages: 1,
          page: 1,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          headers: new AxiosHeaders({ "Content-Type": "application/json" }),
        },
      };
    });
  const testDoc: any = {
    docs: [
      {
        rocket: "5e9d0d95eda69955f709d1eb",
        success: false,
        details: "Engine failure at 33 seconds and loss of vehicle",
        launchpad: "5e9e4502f5090995de566f86",
        name: "FalconSat",
        date_utc: "2006-03-24T22:30:00.000Z",
        id: "5eb87cd9ffd86e000604b32a",
      },
      {
        rocket: "5e9d0d95eda69955f709d1eb",
        success: false,
        details:
          "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
        launchpad: "5e9e4502f5090995de566f86",
        name: "DemoSat",
        date_utc: "2007-03-21T01:10:00.000Z",
        id: "5eb87cdaffd86e000604b32b",
      },
    ],
    totalDocs: 205,
    offset: 0,
    limit: 2,
    totalPages: 103,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: 2,
  };
  expect(
    async () =>
      await populateOneField(testDoc, "launchpad", URL_LAUNCHPADS_QUERY)
  ).rejects.toThrow();
});

test("throws error when network error", async () => {
  jest
    .spyOn(axios, "post")
    .mockImplementationOnce(async (): Promise<AxiosResponse<any, any>> => {
      throw new Error();
    });
  const testDoc: any = {
    docs: [
      {
        rocket: "5e9d0d95eda69955f709d1eb",
        success: false,
        details: "Engine failure at 33 seconds and loss of vehicle",
        launchpad: "5e9e4502f5090995de566f86",
        name: "FalconSat",
        date_utc: "2006-03-24T22:30:00.000Z",
        id: "5eb87cd9ffd86e000604b32a",
      },
      {
        rocket: "5e9d0d95eda69955f709d1eb",
        success: false,
        details:
          "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
        launchpad: "5e9e4502f5090995de566f86",
        name: "DemoSat",
        date_utc: "2007-03-21T01:10:00.000Z",
        id: "5eb87cdaffd86e000604b32b",
      },
    ],
    totalDocs: 205,
    offset: 0,
    limit: 2,
    totalPages: 103,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: 2,
  };
  expect(
    async () =>
      await populateOneField(testDoc as any, "launchpad", URL_LAUNCHPADS_QUERY)
  ).rejects.toThrow();
});

test("throws error when axios error", async () => {
  jest
    .spyOn(axios, "post")
    .mockImplementationOnce(async (): Promise<AxiosResponse<any, any>> => {
      throw new Error("");
    });
  const testDoc = {};
  expect(
    async () =>
      await populateOneField(testDoc as any, "launchpad", URL_LAUNCHPADS_QUERY)
  ).rejects.toThrow();
});

test("throws error some id is invalid", async () => {
  const testDoc: any = {
    docs: [
      {
        rocket: undefined,
        success: false,
        details: "Engine failure at 33 seconds and loss of vehicle",
        launchpad: undefined,
        name: "FalconSat",
        date_utc: "2006-03-24T22:30:00.000Z",
        id: "5eb87cd9ffd86e000604b32a",
      },
      {
        rocket: "5e9d0d95eda69955f709d1eb",
        success: false,
        details:
          "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
        launchpad: "5e9e4502f5090995de566f86",
        name: "DemoSat",
        date_utc: "2007-03-21T01:10:00.000Z",
        id: "5eb87cdaffd86e000604b32b",
      },
    ],
    totalDocs: 205,
    offset: 0,
    limit: 2,
    totalPages: 103,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: 2,
  };
  expect(
    async () =>
      await populateOneField(testDoc, "launchpad", URL_LAUNCHPADS_QUERY)
  ).rejects.toThrow();
});
