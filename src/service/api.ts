export function createApiClient(baseUrl: string) {
  if (!baseUrl) {
    throw new Error('API baseUrl no definida');
  }

  return async function apiFetch<T>(
    path: string,
    options?: RequestInit
  ): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }

    return res.json().catch(() => null as T);
  };
}