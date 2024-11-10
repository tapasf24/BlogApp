const express = require("express");
const app = express();
const port = 5000;
const routes = require("./routes/Routes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.listen(port, () => console.log("serer is running on ", port));
