import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export async function fetchHashnodeBlogs(username) {
  const graphqlClient = new ApolloClient({
    uri: "https://api.hashnode.com/",
    cache: new InMemoryCache(),
  });
  const { data } = await graphqlClient.query({
    query: gql`
      query GetPosts {
        user(username: "${username}") {
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
  return data;
}
