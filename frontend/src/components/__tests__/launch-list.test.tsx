import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

const DummyComponent = ()=><div>LaunchCard dummy</div>;
jest.mock("../launch-card", ()=>DummyComponent);

import LaunchList from "../launch-list";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

test("loads and display loading message", async () => {  
  render(<LaunchList launchDataArray={[
    {
        "id": "5eb87cd9ffd86e000604b32a",
        "launchName": "FalconSat",
        "rocketName": "Falcon 1",
        "launchpadName": "Kwajalein Atoll",
        "details": "Engine failure at 33 seconds and loss of vehicle",
        "date": "2006-03-24T22:30:00.000Z",
        "success": false
    }]}/>);
  const items = await screen.findAllByText("LaunchCard dummy");
  expect(items).toHaveLength(1);
});

test("loads and display loading message", async () => {  
  mock.onGet("/api/v1/launches").reply(200, {
    "results": [
        {
            "id": "5eb87cd9ffd86e000604b32a",
            "launchName": "FalconSat",
            "rocketName": "Falcon 1",
            "launchpadName": "Kwajalein Atoll",
            "details": "Engine failure at 33 seconds and loss of vehicle",
            "date": "2006-03-24T22:30:00.000Z",
            "success": false
        },
        {
            "id": "5eb87cdaffd86e000604b32b",
            "launchName": "DemoSat",
            "rocketName": "Falcon 1",
            "launchpadName": "Kwajalein Atoll",
            "details": "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
            "date": "2007-03-21T01:10:00.000Z",
            "success": false
        }]
  }, { "content-type": "application/json" })
  await render(<LaunchList/>);
  const items = await screen.findAllByText("LaunchCard dummy");
  expect(items).toHaveLength(2);
});

test("loads and display loading message", async () => {
  jest.spyOn(React, "useEffect").mockImplementationOnce(()=>{});
  act(()=>render(<LaunchList/>));
  await screen.findByText("loading, please refresh the page later if you cannot see the launch information.");
});

test("catches axios error", async () => {
  mock.onGet("/api/v1/launches").networkError();
  act(()=>render(<LaunchList/>));
  await screen.findByText("loading, please refresh the page later if you cannot see the launch information.");
});


