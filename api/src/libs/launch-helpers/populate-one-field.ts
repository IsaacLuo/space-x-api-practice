
import axios from "axios"
import {ObjectIdString, SpaceXLaunchPopulated, SpaceXQueryResult } from "../../types";

/**
 * populateOneField, populate launchpadName or rocketName of SpaceXQueryResult<SpaceXLaunchPopulated>
 * 
 * @param launches [in/out] the result of querying URL_LAUNCHES_QUERY
 * @param key the key need to be populated
 * @param url the URL of querying new data of the key you want to populate
 * @returns void, it populates in place.
 */
export async function populateOneField(launches: SpaceXQueryResult<SpaceXLaunchPopulated>, key:"launchpad"|"rocket", url:string) {
  type NameIdPair = {name:string,id:ObjectIdString};
  
  const subDocIdList = launches.docs.map((doc)=> doc[key as keyof SpaceXLaunchPopulated]);
  // deduplicate IDs
  const subDocIds = Array.from(new Set(subDocIdList));

  if (subDocIds.some(id=>id===undefined)) {
    throw new Error(`cannot find specific key ${key} in some launches`);
  }
  // considering on launch can only have one launchpad/rocket, the total launchpad/rocket
  // won't greater than the amount of launches
  let subDocNameResult;
  try {
    subDocNameResult = await axios.post<SpaceXQueryResult<NameIdPair>>(url, {
      "query": {"_id":{"$in":subDocIds}},
      "options":{"select": ["name"], "limit": launches.limit}
    });
  } catch {
    throw new Error(`unable to fetch upstream ${url}}`)
  }
  
  const subDocNameDict = Object.fromEntries(subDocNameResult.data.docs.map(pair=>[pair.id, pair.name]))
  
  for(const launch of launches.docs) {
    if(subDocNameDict[launch[key]]) {
      const populateKey:"launchpadName"|"rocketName" = `${key}Name`;
      launch[populateKey] = subDocNameDict[launch[key]] as string;
    } else {
      throw new Error(`unable to match ${key} ${launch[key]}`);
    }
  }
  return launches;
}