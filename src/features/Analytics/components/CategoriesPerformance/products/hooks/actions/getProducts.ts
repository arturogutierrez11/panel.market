import { IGetProductsRepository } from '@/src/core/adapters/repository/madre/analitics/products/IGetProductsRepository';

export class GetProducts {
  constructor(private readonly repository: IGetProductsRepository) {}

  async execute(filters: any) {
    return this.repository.execute(filters);
  }
}