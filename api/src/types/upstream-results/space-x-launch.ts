import { DateString, ObjectIdString } from "../renamed-types";

/**
 * SpaceXQueryResult<SpaceXLaunch> is the type what Space X API 
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
  id: ObjectIdString;
};

export interface SpaceXLaunchPopulated extends SpaceXLaunch{
  rocketName?: string;
  launchpadName?: string;
}