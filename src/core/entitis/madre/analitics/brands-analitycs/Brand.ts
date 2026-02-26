export type Brand = {
  name: string;
  totalProducts?: number;
  totalOrders?: number;
  totalVisits?: number;
};

export type PaginatedBrands = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  items: Brand[];
};