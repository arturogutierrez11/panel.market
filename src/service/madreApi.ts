import { createApiClient } from './api';

export const madreApi = createApiClient(
  process.env.NEXT_PUBLIC_MADRE_API_URL!
);