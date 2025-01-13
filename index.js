const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");

http = require("http");
require('dotenv').config();

const PokemonRoute     = require("./Routes/PokemonRoute.js");
const UserRoute        = require("./Routes/UserRoute.js");
const OrderRoute       = require("./Routes/OrderRoute.js");

const app = express();
app.use(express.json());
app.use(express.Router());
app.use(cors());
const server = http.createServer(app);

mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => console.log("This shit finally work"))
    .catch(err => console.log(err));

app.use("/api/Pokemon", PokemonRoute);
app.use("/api/User", UserRoute);
app.use("/api/Order", OrderRoute);

app.get("/", (req, res) => {
    res.status(200).json({message: "Home Page"});
})

server.listen(port, () => {
    console.log("Server running on port " + port);
})
