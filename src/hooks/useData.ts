import { useState, useEffect } from 'react';

interface UseDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  refetch: () => void;
}

/**
 * Generic custom hook for loading and managing async data.
 * Handles loading, error, empty, and success states explicitly.
 *
 * @param fetcher - an async function that returns data of type T
 */
export function useData<T>(fetcher: () => Promise<T>): UseDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher, trigger]);

  const isEmpty =
    !loading &&
    !error &&
    data !== null &&
    (Array.isArray(data) ? data.length === 0 : false);

  const refetch = () => {
    setLoading(true);
    setError(null);
    setTrigger((t) => t + 1);
  };

  return { data, loading, error, isEmpty, refetch };
}
