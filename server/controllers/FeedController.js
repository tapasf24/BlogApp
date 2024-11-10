const dbJson = require("../DummyDb.json");

exports.getFeed = (req, res) => {
  const feedData = dbJson.blogs;
  res.send(feedData);
};
