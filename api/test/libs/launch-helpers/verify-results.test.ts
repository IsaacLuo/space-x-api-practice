import {verifyResults} from "../../../src/libs/launch-helpers/verify-results"
test("can verify GET launches results", ()=>{
  const correctResult = {
    "results": [
      {
        "id": "5eb87cd9ffd86e000604b32a",
        "launchName": "FalconSat",
        "rocketName": "Falcon 1",
        "launchpadName": "Kwajalein Atoll",
        "details": "Engine failure at 33 seconds and loss of vehicle",
        "date": new Date("2006-03-24T22:30:00.000Z"),
        "success": false
    },
    {
        "id": "5eb87cdaffd86e000604b32b",
        "launchName": "DemoSat",
        "rocketName": "Falcon 1",
        "launchpadName": "Kwajalein Atoll",
        "details": "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
        "date": new Date("2007-03-21T01:10:00.000Z"),
        "success": false
    },
    ]
  };
  const incorrectDateResult = {
    "results": [
      {
        "id": "5eb87cd9ffd86e000604b32a",
        "launchName": "FalconSat",
        "rocketName": "Falcon 1",
        "launchpadName": "Kwajalein Atoll",
        "details": "Engine failure at 33 seconds and loss of vehicle",
        "date": new Date("2006-03-24T22:30:00.000Z"),
        "success": false
    },
    {
        "id": "5eb87cdaffd86e000604b32b",
        "launchName": "DemoSat",
        "rocketName": "Falcon 1",
        "launchpadName": "Kwajalein Atoll",
        "details": "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
        "date": new Date("some invalid string"),
        "success": false
    },
    ]
  };

  const incorrectMissingItemResult = {
    "results": [
      {
        "id": "5eb87cd9ffd86e000604b32a",
        "launchName": "FalconSat",
        "rocketName": "Falcon 1",
        "launchpadName": "Kwajalein Atoll",
        "details": "Engine failure at 33 seconds and loss of vehicle",
        "date": new Date("2006-03-24T22:30:00.000Z"),
        "success": false
    },
    {
        "id": "5eb87cdaffd86e000604b32b",
        "launchName": "DemoSat",
        "rocketName": undefined,
        "launchpadName": "Kwajalein Atoll",
        "details": "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
        "date": new Date("2006-03-24T22:30:00.000Z"),
        "success": false
    },
    ]
  };
  expect(verifyResults(correctResult)).toBeTruthy();
  expect(verifyResults(incorrectDateResult)).toBeFalsy();
  expect(verifyResults(incorrectMissingItemResult as any)).toBeFalsy();

})