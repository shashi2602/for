export default async function handler(req, res) {
  const data = await fetch(
    "https://raw.githubusercontent.com/shashi2602/devicon/master/devicon.json"
  );
  const icons = await data.json();
  const icon_name = req.query.icon.toLowerCase();
  const icon = icons.find((icon) => icon.name.toLowerCase() === icon_name);
  res.status(200).json(icon.versions.svg[0]);
}
