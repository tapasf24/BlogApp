exports.getJson = (req, res) => {
  const resp = { status: 200, description: "The call is successful" };
  res.send(resp);
};
