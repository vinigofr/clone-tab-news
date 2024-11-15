const status = (req, res) => {
  const { name } = req.query;
  res.status(200).json({ message: "ok" });
};

export default status;
