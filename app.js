const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB error ${err.message}`);
});



app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

app.use("/", postRoutes);
app.use("/", authRoutes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:"Unauthorized!"});
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
