// index.js

const express = require("express");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

app.use("/api/v1", userRoute);
app.use("/api/v1", postRoute);

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
