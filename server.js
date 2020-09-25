const express = require("express"); // Including the express module in this file
const mongoose = require("mongoose"); // For MongoDB
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Set up express
const app = express();
app.use(express.json()); // Using the JSON body parser
app.use(cors());

// Setting up mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// Setting up routes middleware
const users = require("./routes/userRouter");
const songs = require("./routes/songRoutes");
app.use("/users", users);
app.use("/songs", songs);

// Serve static assests if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  // Any request that is not a route should load the indx.html of the client folder
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
