import { ObjectIdString } from "./renamed-types";

/**
 * Launch[] is the result type of the api endpoint
 * /v1/launches
 */
export type Launch = {
  id: ObjectIdString;
  launchName: string;
  rocketName: string;
  launchpadName: string;
  details: string;
  date: Date;
  success: boolean;
};

/**
 * The result of the only API of the practice.
 * the type name ApiResult is fixed in requirements, it needs to be renamed
 * if more API is required in the future.
 */
export type ApiResult = {
  results: Launch[];
};

