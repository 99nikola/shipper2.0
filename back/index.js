const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/products");
const feedRoute = require("./routes/feed");
const setupRoute = require("./routes/setup");
const reviewsRoute = require("./routes/reviews");
const ordersRoute = require("./routes/orders");

const pool = require("./database");
const auth = require("./middleware/authToken");


pool.getConnection()
.then(conn => {
    console.log("Connected to MYSQL database");
    conn.release();
})
.catch(err => console.error(err));


// middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", auth, usersRoute);
app.use("/api/products", auth, productsRoute);
app.use("/api/feed", feedRoute);
app.use("/api/setup", setupRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/orders", auth, ordersRoute);


app.listen(3030, () => {
    console.log("Backend server listening on port 3030");
});