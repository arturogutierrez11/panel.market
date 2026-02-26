import { ISearchCategoriesRepository } from "@/src/core/adapters/repository/madre/analitics/products-analitycs/categories/ISearchCategoriesRepository";
import { HttpClient } from "../../../../http/httpClient";
import { Category } from "@/src/core/entitis/madre/analitics/products-analitycs/Category";

export class SearchCategoriesRepository
  implements ISearchCategoriesRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(query: string): Promise<Category[]> {
    return this.http.get(
      `/api/analytics/products/categories/search?q=${query}`
    );
  }
}