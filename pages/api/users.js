import { getAllUsers } from "../../services/user.services";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  // const data = await fetch(
  //   "https://dev.to/api/articles?username=chrisdevcode&per_page=5"
  // );
  // const posts = await data.json();
  const data = [];
  await getAllUsers().then((users) => {
    users.docs.map((user) => {
      data.push(user.data().uid);
    });
  });
  res.status(200).json({ users: data });
}
