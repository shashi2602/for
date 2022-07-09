import { getAllUsers } from "../../services/user.services";
export default async function handler(req, res) {
  const data = [];
  await getAllUsers().then((users) => {
    users.docs.map((user) => {
      data.push(user.data().uid);
    });
  });
  res.status(200).json({ users: data });
}
