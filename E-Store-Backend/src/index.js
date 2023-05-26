const express = require("express");
const env = require("dotenv");
const bodyparse = require("body-parser");
const DBconnection = require("./config/config");

const userroute = require("./routes/userauth");
const adminroute = require("./routes/admin/adminauth");

//environment variables also knows as contants
env.config();
const URL = process.env.MONGO_DB_URL;

const app = express();

//application middleware
app.use(express.json({ extended: true }));

// // database connection
DBconnection(URL);

//application routes
app.use("/api", userroute);
app.use("/api", adminroute);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

