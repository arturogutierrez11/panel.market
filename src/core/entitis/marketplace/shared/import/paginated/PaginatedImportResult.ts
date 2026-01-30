export type PaginatedImportResult<T> = {
  items: T[];
  limit: number;
  offset: number;
};