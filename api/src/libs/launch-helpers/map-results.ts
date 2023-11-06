import { ApiResult, Launch, SpaceXLaunchPopulated, SpaceXQueryResult } from "../../types";

/**
 * mapResult, it maps the populated result from upstreams SpaceXQueryResult<SpaceXLaunchPopulated> 
 * to downstream format "ApiResult"
 * @param launches the populated launches data
 * @returns converted data for downstream
 */
export function mapResult(launches: SpaceXQueryResult<SpaceXLaunchPopulated>): ApiResult {
  const results:Launch[] = launches.docs.map(launch=>({
    id: launch.id,
    launchName: launch.name,
    rocketName: launch.rocketName!, // rocketName is assured in populateOneField()
    launchpadName: launch.launchpadName!, //launchPadName is assured in populateOneField()
    details: launch.details,
    date: new Date(launch.date_utc),
    success: launch.success,
  }));
  return {results};
}