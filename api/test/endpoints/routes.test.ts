import { Request, Response } from "express";
import { routes } from "../../src/endpoints/routes";
import * as getLaunchesModule from "../../src/endpoints/launches";

jest
  .spyOn(getLaunchesModule, "getLaunches")
  .mockImplementation(
    (_: any, res: Response) => res.send({ message: "OK" }) as any
  );

const app = {
  get: jest.fn((_: string, func: (req: Request, res: Response) => any) => {
    func(
      { query: {} } as any,
      { status: jest.fn().mockReturnThis(), send: jest.fn() } as any
    );
  }),
  use: jest.fn((func: (req: Request, res: Response) => any) => {
    func(
      { query: {} } as any,
      { status: jest.fn().mockReturnThis(), send: jest.fn() } as any
    );
  }),
};

test("we have enough endpoints", () => {
  routes(app as any);

  expect(app.get).toHaveBeenCalledWith(
    "/api/v1/launches",
    getLaunchesModule.getLaunches
  );
  expect(app.get).toHaveBeenCalledWith("/", expect.anything());
  expect(app.use).toHaveBeenCalledTimes(1);
});
