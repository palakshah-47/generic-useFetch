import { useCallback, useState, useEffect } from "react";

type HttpMethod = "POST" | "PUT" | "GET" | "DELETE";

type UseApiOptions = {
  method?: HttpMethod;
  params?: Record<string, string | number | boolean>;
  headers?: HeadersInit;
  body?: any;
  immediate?: boolean;
};

type UseApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

const buildUrlWithParems = (
  url: string,
  params?: Record<string, string | boolean | number>
): string => {
  if (!params) return url;
  const query = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    query.append(key, String(params[key]));
  });
  return `${url}?{query.toString()}`;
};

export const useFetch = <T>(url: string, options?: UseApiOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(options?.immediate ?? false);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger((n) => n + 1), []);

  useEffect(() => {
    if (options?.immediate === false && trigger === 0) return;

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      const fullUrl = buildUrlWithParems(url, options?.params);
      try {
        const res = await fetch(fullUrl, {
          method: options?.method || "GET",
          headers: { "Content-type": "application/json", ...options?.headers },
          body: options?.body ? JSON.stringify(options.body) : undefined,
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const json = await res.json();
        if (isMounted) setData(json);
      } catch (error: Error) {
        if (isMounted) setError(error?.message || "Fetch failed");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [url, trigger, JSON.stringify(options)]);
  return { data, loading, error, refetch };
};
