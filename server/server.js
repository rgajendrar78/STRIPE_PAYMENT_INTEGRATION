const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Oh5tASDDW95JcpHcD4ondq4nwbyDwKGE3eDxCKbkHlAJgqRT1H6Oq7lGqIDMQ2jTva22ZJdWFSFukkAEdpodeb600dTzMGzpm"
);

app.use(express.json());
app.use(cors());

app.post("/api/create/checkout/session", async (req, res) => {
  try {
    const { products, customerEmail } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required",
      customer_email: "raju@gmail.com",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating checkout session" });
  }
});

app.listen(7000, () => {
  console.log("Server started on port 7000");
});
