import { ObjectIdString } from "../renamed-types";

/**
 * SpaceXRocket[] is the type what Space X API 
 * https://api.spacexdata.com/v4/rockets returns
 * It only contains the essential types we are currently focused, 
 * to be extended if we need more information from the upstream.
 */
export interface SpaceXRocket {
  name: string;
  id:ObjectIdString;
};