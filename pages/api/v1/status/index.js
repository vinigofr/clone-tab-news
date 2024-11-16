import database from "../../../../infra/database";

const status = async (req, res) => {
  const result = await database.query("SELECT 1 + 1 as sum;");
  res.status(200).json({ message: "ok" });
};

export default status;
