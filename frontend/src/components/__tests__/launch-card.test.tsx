import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LaunchCard from "../launch-card";

test("loads and display launch card success", async () => {
  const launchData = {
    id: "5eb87cd9ffd86e000604b32a",
    launchName: "FalconSat",
    rocketName: "Falcon 1",
    launchpadName: "Kwajalein Atoll",
    details: "Engine failure at 33 seconds and loss of vehicle",
    date: "2006-03-24T22:30:00.000Z",
    success: true,
  };
  render(
    <LaunchCard launchData={launchData} launchPictureSrc="/537-521x521.jpg" />
  );
  await screen.findByText("FalconSat");
  await screen.findByAltText("launch picture of FalconSat");
  await screen.findByText("Success");
});

test("loads and display launch card failed", async () => {
  const launchData = {
    id: "5eb87cd9ffd86e000604b32a",
    launchName: "FalconSat",
    rocketName: "Falcon 1",
    launchpadName: "Kwajalein Atoll",
    details: "Engine failure at 33 seconds and loss of vehicle",
    date: "2006-03-24T22:30:00.000Z",
    success: false,
  };
  render(
    <LaunchCard launchData={launchData} launchPictureSrc="/537-521x521.jpg" />
  );
  await screen.findByText("FalconSat");
  await screen.findByAltText("launch picture of FalconSat");
  await screen.findByText("Failed");
});
