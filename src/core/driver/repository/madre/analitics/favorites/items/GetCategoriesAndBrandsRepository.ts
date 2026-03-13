import { HttpClient } from "../../../../http/httpClient";

export type QueryParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type BrandItem = {
  brand: string;
  totalProducts: number | string;
};

export type CategoryItem = {
  categoryId: string;
  categoryName: string;
  level: number;
  totalProducts: number | string;
  path?: string;
};

export type BrandsResponse = {
  data: BrandItem[];
  pagination: Pagination;
};

export type CategoriesResponse = {
  data: CategoryItem[];
  pagination: Pagination;
};

export class GetCategoriesAndBrandsRepository {
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  private buildQuery(params?: QueryParams) {
    if (!params) return "";

    const query = new URLSearchParams();

    if (params.page !== undefined)
      query.append("page", String(params.page));

    if (params.limit !== undefined)
      query.append("limit", String(params.limit));

    if (params.search)
      query.append("search", params.search);

    const qs = query.toString();

    return qs ? `?${qs}` : "";
  }

  async getBrands(
    marketplaceId: number,
    params?: QueryParams
  ): Promise<BrandsResponse> {

    const qs = this.buildQuery(params);

    return this.http.get<BrandsResponse>(
      `/api/analytics/marketplace-favorites/${marketplaceId}/brands${qs}`
    );
  }

  async getCategories(
    marketplaceId: number,
    params?: QueryParams
  ): Promise<CategoriesResponse> {

    const qs = this.buildQuery(params);

    return this.http.get<CategoriesResponse>(
      `/api/analytics/marketplace-favorites/${marketplaceId}/categories${qs}`
    );
  }
}