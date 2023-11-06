import { mapResult } from "../../../src/libs/launch-helpers/map-results";
import { ApiResult } from "../../../src/types";

test("it maps essential data to ApiResult", () => {
  const source = {
    docs: [
      {
        rocket: "5e9d0d95eda69955f709d1eb",
        rocketName: "Falcon 1",
        success: false,
        details: "Engine failure at 33 seconds and loss of vehicle",
        launchpad: "5e9e4502f5090995de566f86",
        launchpadName: "Kwajalein Atoll",
        name: "FalconSat",
        date_utc: "2006-03-24T22:30:00.000Z",
        id: "5eb87cd9ffd86e000604b32a",
      },
      {
        rocket: "5e9d0d95eda69955f709d1eb",
        rocketName: "Falcon 1",
        success: false,
        details:
          "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
        launchpad: "5e9e4502f5090995de566f86",
        launchpadName: "Kwajalein Atoll",
        name: "DemoSat",
        date_utc: "2007-03-21T01:10:00.000Z",
        id: "5eb87cdaffd86e000604b32b",
      },
    ],
    totalDocs: 205,
    offset: 0,
    limit: 2,
    totalPages: 21,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: 2,
  };

  const expectedResult: ApiResult = {
    results: [
      {
        id: "5eb87cd9ffd86e000604b32a",
        launchName: "FalconSat",
        rocketName: "Falcon 1",
        launchpadName: "Kwajalein Atoll",
        details: "Engine failure at 33 seconds and loss of vehicle",
        date: new Date("2006-03-24T22:30:00.000Z"),
        success: false,
      },
      {
        id: "5eb87cdaffd86e000604b32b",
        launchName: "DemoSat",
        rocketName: "Falcon 1",
        launchpadName: "Kwajalein Atoll",
        details:
          "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
        date: new Date("2007-03-21T01:10:00.000Z"),
        success: false,
      },
    ],
  };
  expect(mapResult(source)).toEqual(expectedResult);
});
