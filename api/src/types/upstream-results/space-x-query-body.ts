/**
 * The options part of querying space X API
 */
export interface spaceXQueryOptions {
  select?: any;
  sort?: any;
  offset?: number;
  page?: number;
  limit?: number;
  pagination?: boolean;
  // populate is not allowed in this practice
  // populate?: any,
}

/**
 * The query body of space X API
 * the query must be a legal mongodb query object
 */
export interface spaceXQueryBody {
  query: any;
  options: spaceXQueryOptions;
}
