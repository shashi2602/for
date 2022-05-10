import useFetch from "../hooks/useFetch";

export async function devtofetch(username) {
  const data = await fetch(
    `https://dev.to/api/articles?username=${username}&per_page=5`
  );
  return data;
}
