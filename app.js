const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = require("./middleware/logger");
const PORT = process.env.PORT || 5000;
const cors = require("cors")
const rateRoute = require("./routes/rates");

app.use(morgan("dev"));
app.use(cors())

//routes
app.use("/api/rates", rateRoute);

app.use((error, req, res, next) => {
    //log errors
    logger.log("error", error.message)

    res.status(500).json({ message: error.message })
})

//start server
app.listen(process.env.PORT || PORT, () => logger.log("info", `server running... on port ${PORT}`))