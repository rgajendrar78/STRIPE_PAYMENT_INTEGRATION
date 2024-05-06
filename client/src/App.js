import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const handleSubmit = async () => {
    const stripe = await loadStripe(
      "pk_test_51Oh5tASDDW95JcpHuRTgkcUtAPEmUQJDzhTQIU69yRWlHTzgUpCpFSy7QAFSAiOxs1xLmZqS1t8I4hknI4k9QDlk009ZgujicI"
    );
    const body = {
      products: [
        {
          name: "mango",
          price: 100,
          quantity: 1,
        },
      ],
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:7000/api/create/checkout/session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return <button onClick={handleSubmit}>checkout</button>;
};

export default App;
