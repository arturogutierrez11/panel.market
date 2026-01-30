export type PaginatedResult<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  hasNext: boolean;
  nextOffset?: number;
};