export default async function handler(req, res) {
  const username = req.query.username;
  const data = await fetch(
    `https://dev.to/api/articles?username=${username}&per_page=5`
  );
  const dev_to_blogs = await data.json();
  if (dev_to_blogs.length == 0) {
    res.status(401).json({ msg: "No blogs found in your dev.to or no username found" });
  } else {
    const filtered_blogs=dev_to_blogs.map((blog) => {
        return {
            title: blog.title,
            url: blog.url,
            image: blog.cover_image,
            description: blog.description,
            published_at: blog.published_at,
            published_on:"devto"
    }
})
    res.status(200).json(filtered_blogs);
  }
}
