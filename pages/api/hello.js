// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  const data = await fetch(
    "https://dev.to/api/articles?username=chrisdevcode&per_page=5"
  );
  const posts = await data.json();
  res.status(200).json({ name: "John Doe", posts: posts });
}
