const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bedsRoute = require('./routes/beds');
const bedsdealingRoute = require('./routes/bedsdealing')

var cors = require('cors');
const PORT = process.env.PORT || 8888;

dotenv.config();
app.use(cors());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());

app.use(bedsRoute);
app.use(bedsdealingRoute);

app.listen(PORT, () => {
    console.log("Backend server is running! on port 8888")
});