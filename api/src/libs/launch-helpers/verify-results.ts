import { ApiResult } from "../../types";


export function verifyResults(apiResult:ApiResult):boolean {
  for (const result of apiResult.results) {
    if (!result.date || !(result.date instanceof Date) || result.date.toString() === "Invalid Date" ) {
      return false;
    }
    if (!(result.details && result.id && result.launchName && result.launchpadName && result.rocketName)) {
      return false;
    }
  }
  return true;
}