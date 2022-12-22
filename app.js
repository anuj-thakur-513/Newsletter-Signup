const express = require("express");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();
// creating a port to host the server
const PORT = process.env.PORT || 3000;

// setting info for client(mailchimp)
client.setConfig({
  apiKey: "925c0ce9a9c6e7ff6ca2753acd78018c-us17",
  server: "us17",
});

// using body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// to use static files
app.use(express.static("public"));

// setting the home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

// setting the post route
app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // JS user object
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  // adding data to the mailchimp server asynchronously
  async function run() {
    const response = await client.lists.addListMember("6ddfbc491d", {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });
    console.log(response);
  }

  run().catch((e) => res.sendFile(__dirname + "/failure.html"));
});

// starting the server
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

// API Key
// 925c0ce9a9c6e7ff6ca2753acd78018c-us17

// List/Audience ID
// 6ddfbc491d
