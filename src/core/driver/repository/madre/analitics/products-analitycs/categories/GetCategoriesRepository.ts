import { IGetCategoriesRepository } from "@/src/core/adapters/repository/madre/analitics/products-analitycs/categories/IGetCategoriesRepository";
import { HttpClient } from "../../../../http/httpClient";
import { Category } from "@/src/core/entitis/madre/analitics/products-analitycs/Category";

export class GetCategoriesRepository
  implements IGetCategoriesRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(): Promise<Category[]> {
    const response = await this.http.get<Category[]>(
      `/api/analytics/products/categories`
    );

    if (!Array.isArray(response)) {
      return [];
    }

    return response;
  }
}