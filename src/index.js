require('dotenv').config()
const app = require("./app");
const mongoose = require('mongoose')

let port = process.env.PORT;
let DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
    console.log("DB connected successfully")
}).catch((err) => {
        console.log("DB failed to connected")
})

app.listen(port, () => {
    console.log("Server Listening to PORT", port)
})