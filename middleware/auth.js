const jwt = require("jsonwebtoken");

// Auth middleware to ensure requests are authenticated by a logged in user
const auth = (req, res, next) => {
  try {
    // The client contains a header with field x-auth-token
    // Extract the client's JSON Web Token from the req header
    const token = req.header("x-auth-token");

    // Is a token present (is the value truthy)
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    // With the token and JWT_SECRET, we want to decode the payload/message of the JSON object
    // Encoded: secret + MongoDB_id = encrypted_token
    // Decoded: encrypted_token + JWT_SECRET = original MongoDB_id
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    // On the req object, we want to create a user key/property/field
    // That field will contain the decrypted id from the verified token
    req.user = verified.id;

    // Middleware ends, continue to execute the next function
    // Next function in the route syntax most likely (req, res)
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
