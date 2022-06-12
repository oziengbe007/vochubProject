const express = require ("express");

const app = express();

const api = require("./routes/api")

const User = require ("./user/user")

const Admin = require("./admin/admin")

const bodyParser = require("body-parser");

const cors = require("cors");

const PORT= 4000;

app.use(cors());

app.use(bodyParser.json());

app.use("/api", api);


app.listen(PORT, ()=>{
    console.log(`Now listening on port ${PORT}`)
});

