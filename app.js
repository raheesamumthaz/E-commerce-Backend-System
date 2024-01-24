const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.listen(4000, () => console.log(`Listening on: 4000`));