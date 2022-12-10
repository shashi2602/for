import { getAllUsers } from "../../../services/user.services";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
  });
  const data = [];
  await getAllUsers().then((users) => {
    users.docs.map((user) => {
      data.push(user.data().uid);
    });
  });
  res.send(data.some((u) => u == req.query.id));
}
