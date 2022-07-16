import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export default async function handler(req, res) {
  const username = req.query.username;
  const graphqlClient = new ApolloClient({
    uri: "https://api.hashnode.com/",
    cache: new InMemoryCache(),
  });
  const { data } = await graphqlClient.query({
    query: gql`
          query GetPosts {
            user(username: "${username}") {
                publicationDomain
              publication {
                posts(page: 0) {
                  _id
                  coverImage
                  slug
                  title
                  brief
                }
              }
            }
          }
        `,
  });
  if (data.user.publication == null) {
    res.status(401).json({ msg: `No user found with ${username} on hashnode` });
  } else {
    if (data.user.publication.posts.length == 0) {
      res.status(401).json({ msg: "No blogs found in your hashnode" });
    }
    const filtered_data = data.user.publication.posts.map((blog) => {
      return {
        title: blog.title,
        url: `https://${data.user.publicationDomain}/${blog.slug}`,
        image: blog.coverImage,
        description: blog.brief,
        published_at: blog.publishedAt,
        published_on: "hashnode",
      };
    });
    res.status(200).json(filtered_data);
  }
}
