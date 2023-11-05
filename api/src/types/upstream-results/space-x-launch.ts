import { DateNumber, DateString, ObjectIdString } from "../renamed-types";

/**
 * SpaceXLaunch[] is the type what Space X API 
 * https://api.spacexdata.com/v4/launches returns
 * It only contains the essential types we are currently focused, 
 * to be extended if we need more information from the upstream.
 */
export interface SpaceXLaunch {
  rocket: ObjectIdString;
  success: boolean;
  details: string;
  launchpad: ObjectIdString;
  name:string;
  date_utc: DateString;
  date_unix: DateNumber;
  date_local: DateString;
  date_precision: string;
  id: ObjectIdString;
};