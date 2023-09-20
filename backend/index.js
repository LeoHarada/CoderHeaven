const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require("stripe");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongoDB connection
mongoose.set(`strictQuery`, false);
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(err));

//schemas
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
});

const productSchema = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

//models
const userModel = mongoose.model("user", userSchema);
const productModel = mongoose.model("product", productSchema);

//api
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/signup", async (req, res) => {
    const { email } = req.body;

    try {
        const result = await userModel.findOne({ email: email });

        if (result) {
            res.send({
                message: "This Email's already registered.",
                alert: false,
            });
        } else {
            const data = new userModel(req.body);
            await data.save();
            res.send({ message: "Registration successful!", alert: true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error", alert: false });
    }
});

// API login
app.post("/login", async (req, res) => {
    const { email } = req.body;

    try {
        const result = await userModel.findOne({ email: email });

        if (result) {
            const dataSend = {
                id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            };
            res.send({
                message: "Login successful!",
                alert: true,
                data: dataSend,
            });
        } else {
            res.send({
                message: "Username and/or password are incorrect. Try again!",
                alert: false,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error", alert: false });
    }
});

//product api
app.post("/uploadProduct", async (req, res) => {
    const data = await productModel(req.body);
    const dataSave = await data.save();
    res.send({
        message: "Uploaded product successfully!",
    });
});

app.get("/product", async (req, res) => {
    const data = await productModel.find({});
    res.send(JSON.stringify(data));
});

//payment gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/checkout-payment", async (req, res) => {
    try {
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                { shipping_rate: "shr_1NsVPTBdnZ7zmfg4WKlwzmaH" },
            ],
            line_items: req.body.map((product) => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            // images: [product.image],
                        },
                        unit_amount: product.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: product.qty,
                };
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session.id);
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
    }
});

//server is running
app.listen(PORT, () => console.log("server is running on port : " + PORT));
