import useSWR from "swr";

function useFetch(link) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(link, fetcher);
  return {
    data: data,
    error: error,
  };
}

export default useFetch;
