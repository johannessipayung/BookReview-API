const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

// Middleware to check authentication
app.use("/customer/auth/*", (req, res, next) => {
  if (req.session && req.session.authorization) {
    const token = req.session.authorization.accessToken;

    jwt.verify(token, "access", (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(403).json({ message: "User not authenticated" });
  }
});

app.use("/customer", customer_routes);
app.use("/", genl_routes);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
