import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock('next/font/google', ()=>({
  Inter: jest.fn(()=>({className:"dummy"}))
}))

const DummyComponent = (props:any)=><div className={props.className}>LaunchList dummy</div>;
jest.mock("../components/launch-list", ()=>DummyComponent);

import Home from "../pages/index";

test("loads submodules", async () => {  
  render(<Home/>);
  const item = await screen.findByText("LaunchList dummy");
  expect((item.parentNode as typeof item)?.classList?.contains("dummy")).toBeTruthy();
});


