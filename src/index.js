const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const PORT = process.env.port || 9000
const ErrorHandler = require("./middleware/error");
const cors = require('cors');

const dbConnection = require("./config/db");
dbConnection();
app.use(cors());
app.use(express.json());

const routes = require("./routes/index")
app.use("/", routes);

app.use(ErrorHandler);

app.listen(PORT, () => {
    console.log(`--------------------------------------> server running on port : ${PORT}`);
});
