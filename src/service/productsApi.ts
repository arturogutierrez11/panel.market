import { createApiClient } from './api';

export const productsApi = createApiClient(
  process.env.NEXT_PUBLIC_PRODUCTS_API_URL!
);