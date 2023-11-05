export interface spaceXQueryBody<TSpaceXDoc> {
  query: Partial<TSpaceXDoc>;
  options: {
    select?:any,
    sort?:any,
    offset?:number,
    page?:number,
    limit?:number,
    pagination?:boolean,
    // populate is not allowed in this practice
    // populate?: any,
  };
}