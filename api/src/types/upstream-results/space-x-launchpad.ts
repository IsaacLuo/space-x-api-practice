import { ObjectIdString } from "../renamed-types";

/**
 * SpaceXLaunchpad[] is the type what Space X API 
 * https://api.spacexdata.com/v4/launchpads returns
 * It only contains the essential types we are currently focused, 
 * to be extended if we need more information from the upstream.
 */
export interface SpaceXLaunchpad {
  name: string;
  full_name: string;
  rockets: ObjectIdString[];
  launches: ObjectIdString[];
  details: string;
  id: ObjectIdString;
};