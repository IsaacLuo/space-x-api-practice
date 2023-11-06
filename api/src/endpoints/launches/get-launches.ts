import { Request, Response } from "express";
import axios from "axios";
import {
  URL_LAUNCHES_QUERY,
  URL_LAUNCHPADS_QUERY,
  URL_ROCKETS_QUERY,
} from "../../upstream-urls";
import { SpaceXLaunch, SpaceXQueryResult } from "../../types";
import { populateOneField } from "../../libs/launch-helpers/populate-one-field";
import { mapResult } from "../../libs/launch-helpers/map-results";

/**
 * getLaunches, express process of handling GET /launches
 * @param req use query{page}
 * @param res sends 200, 500
 */
export async function getLaunches(req: Request, res: Response): Promise<void> {
  const { page = 1 } = req.query;
  const selectedKeys = [
    "rocket",
    "success",
    "details",
    "launchpad",
    "name",
    "date_utc",
    "id",
  ];
  let response;
  try {
    response = await axios.post<SpaceXQueryResult<SpaceXLaunch>>(
      URL_LAUNCHES_QUERY,
      { options: { select: selectedKeys, page: page } }
    );
  } catch {
    res.status(500).send({ message: "Upstream launches is not accessible" });
    return;
  }

  try {
    const launches = response.data;
    await populateOneField(launches, "launchpad", URL_LAUNCHPADS_QUERY);
    await populateOneField(launches, "rocket", URL_ROCKETS_QUERY);

    const results = mapResult(launches);

    res.send(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Unable to generate launches information" });
  }
}
