const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRouter = require("./routes/todoRouter");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGODB_URI;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(express.urlencoded({ limit: "30mb", extended: true }));
//For CORS
app.use(cors());

//using boody-parser to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setting primary routes
app.use("/todos", todoRouter);
app.use(express.static(path.join(__dirname, "./client", "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./client", "./client/build", "index.html")
  );
});
// Establishing connection with db
mongoose
  .connect(CONNECTION_URL, connectionParams)
  .then(() => {
    console.log("Database connection established");
    app.listen(PORT, () => {
      console.log(`Application is listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
