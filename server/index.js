require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./utils/db");
const userRouters = require("./routes/user.routes");

//MiddleWares
app.use(express.json());
app.use(cors());

// DatabaseConnection
connection();

app.use("/user", userRouters);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
