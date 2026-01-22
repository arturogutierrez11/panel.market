import { createApiClient } from './api';

export const marketplaceApi = createApiClient(
  process.env.NEXT_PUBLIC_MARKETPLACE_API_URL!
);