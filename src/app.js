const express = require("express");
const routes = require('./routes/v1');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use("/users", routes);





module.exports = app;