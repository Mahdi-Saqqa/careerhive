const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");

const port = 8000;

const app = express();

const allowedOrigins = ["https://careerhive.mahdi.ps"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowedOrigins array or if it's not present (e.g., from same-origin)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Make sure to include this if you're working with credentials
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing URL-encoded bodies

app.use(cookies());

//require our mongoose config file and tell it about the db name
require("./config/mongoose.config");

//require our routes and tell it about our app
require("./routes/routes")(app);

app.listen(port, () => console.log("listening on port", port));
