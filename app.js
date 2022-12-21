const express = require("express");
const request = require("request");

const app = express();
// creating a port to host the server
const PORT = process.env.PORT || 3000;

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
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  console.log(`${firstName} ${lastName} ${email}`);
});

// starting the server
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
