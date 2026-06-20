import { useEffect, useState } from 'react';

type ResourceState<T> = {
  data: T;
  isLoading: boolean;
  error: string | null;
  source: 'api' | 'fallback';
};

export function useApiResource<T>(loader: () => Promise<T>, fallback: T, deps: unknown[] = []) {
  const [state, setState] = useState<ResourceState<T>>({
    data: fallback,
    isLoading: true,
    error: null,
    source: 'fallback',
  });

  useEffect(() => {
    let active = true;

    setState((current) => ({ ...current, isLoading: true, error: null }));
    loader()
      .then((data) => {
        if (active) {
          setState({ data, isLoading: false, error: null, source: 'api' });
        }
      })
      .catch((error) => {
        if (active) {
          setState({
            data: fallback,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Backend unavailable',
            source: 'fallback',
          });
        }
      });

    return () => {
      active = false;
    };
  }, deps);

  return state;
}

