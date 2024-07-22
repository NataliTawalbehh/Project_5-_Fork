const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers
const rolesRouter = require("./routes/Role");
const usersRouter = require("./routes/Users");
const categoryRouter = require("./routes/Category");
const shopRouter=require("./routes/Shop")
const productRouter=require("./routes/Product")
const cartRouter=require("./routes/Cart")
const reviewRouter=require("./routes/Review")
const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
app.use("/categories", categoryRouter);
app.use("/shop",shopRouter)
app.use("/product",productRouter)
app.use("/storeUser",cartRouter)
app.use("/review",reviewRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
