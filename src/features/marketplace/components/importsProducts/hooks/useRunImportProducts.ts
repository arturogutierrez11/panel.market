'use client';

import { useCallback, useState } from 'react';
import { runImportProductsAction, RunImportStatus } from './actions/runImportProducts';


type Params = {
  marketplace: 'megatone' | 'oncity';
};

export function useRunImportProducts({ marketplace }: Params) {
  const [status, setStatus] = useState<RunImportStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runImport = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await runImportProductsAction({
        marketplace,
      });

      setStatus(response.status);
    } catch (err) {
      setStatus('FAILED');
      setError('Error ejecutando el import');
    } finally {
      setLoading(false);
    }
  }, [marketplace, loading]);

  return {
    runImport,
    status,
    loading,
    error,
    isRunning: loading || status === 'STARTED',
  };
}