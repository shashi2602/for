export default async function handler(req, res) {
  const username = req.query.username;
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}?latest`
  );
  const blogs = await response.json();
  if (blogs.status == "error") {
    res.status(401).json({ msg: `No user found with ${username} on hashnode` });
  } else {
    if (blogs.items.length == 0) {
      res.status(401).json({ msg: "No blogs found in your medium" });
    } else {
      const filtered_blogs = blogs.items.map((blog) => {
        return {
          title: blog.title,
          url: blog.link,
          image: blog.thumbnail,
          description: blog.description,
          published_at: blog.pubDate,
          published_on: "medium",
        };
      });
      res.status(200).json(filtered_blogs);
    }
  }
}
