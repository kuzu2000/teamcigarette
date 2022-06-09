const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const cartRoute = require('./routes/cart')
const stripeRoute = require('./routes/stripe')
const userRoute = require('./routes/user')
const newsRoute = require('./routes/news')
const teamsRoute = require('./routes/teams')
const path = require('path')
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,
    useUnifiedTopology: true}).then(() => console.log("Database is running")).catch((err) => console.log(err))

app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/carts', cartRoute)
app.use("/api/checkout", stripeRoute);
app.use('/api/users', userRoute)
app.use('/api/news', newsRoute)
app.use('/api/teams', teamsRoute)

//------------------deploy-----------------
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
//------------------deploy-----------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running"))
