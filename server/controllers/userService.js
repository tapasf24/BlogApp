const dbJson = require("../DummyDb.json");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

exports.registerUser = (req, res) => {
  const body = req.body;
  body.id = uuidv4();
  dbJson.user.push(body);
  console.log(body);
  res.status(201);
  res.send({ ...body, status: "successful" });
};

const generateJwt = async (data) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(data, jwtSecretKey, { expiresIn: "2h" });
  return token;
};

exports.login = async (req, res) => {
  try {
    const body = req.body;
    const { username, password } = body;
    const foundUser = dbJson.user.filter(
      (item) => item.username === username && item.password === password
    );
    if (foundUser.length === 1) {
      let data = {
        username: username,
        password: password,
        time: Date.now(),
      };

      const token = await generateJwt(data);
      res.status(200);
      res.send({
        username: username,
        token: token,
        name: foundUser[0].name,
        status: "Login Successfulssss",
      });
    } else {
      res.status(401);
      res.send({
        status: "User Not Found",
      });
    }
  } catch (e) {
    res.status(500);
    res.send("internal Server Error");
  }
};

exports.validateJwt = async (req, res, next) => {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    const token = req.headers.token;
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return next();
    } else {
      return false;
    }
  } catch (e) {
    res.send(e);
  }
};
