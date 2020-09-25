const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Song = require("../models/songModel");

router.get("/test", (req, res) => {
  res.send("Hello, it's working");
});

// @route POST /users/register
// @desc Register user onto MongoDB database
// @access Public
router.post("/register", async (req, res) => {
  // Try to execute this code if there are no internal server 500 errors
  try {
    // Destructure user field input from the req.body object
    const { email, password, passwordCheck, username } = req.body;

    // Validation code -----------------------------------------------------------------
    // Checking for the existence of required user input
    if (!email || !password || !passwordCheck || !username) {
      // The res object will have a status of 400
      // .json() serilazies the object passed into JSON and sends it in the HTTP
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    // Checking for minimum password length
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    }

    // Checking if password and password check match
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    }

    // Checking if a client attempts to register with credentials that already exist in our database
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }
    // End of validation code -----------------------------------------------------------------

    // Storing user credentials onto the database -----------------------------------------------------------------
    // Storing the password as a hash
    const salt = await bcrypt.genSalt();
    // bcrypt hash: 1st parameter is the string to hash, 2nd parameter is the salt for the hash
    const passwordHash = await bcrypt.hash(password, salt);
    // Create a newUser MongoDB object and store it into the database
    const newUser = new User({
      email: email,
      password: passwordHash,
      username: username,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    return res.json(savedUser);
    // End of storing user credentials -----------------------------------------------------------------
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// @route POST /users/login
// @desc Register user onto MongoDB database
// @access Public
router.post("/login", async (req, res) => {
  try {
    // Destructure the email and password
    const { email, password } = req.body;

    // Validation code -----------------------------------------------------------------
    // Checking for the existence of required user input
    if (!email || !password) {
      // The res object will have a status of 400
      // .json() serilazies the object passed into JSON and sends it in the HTTP
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    // End of validation code -----------------------------------------------------------------

    // Find user in the database based on login credentials
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    }

    // Compare the login password with the password on the database
    // Everything is compared with hashed passwords, not plaintext
    // bcrypt.compare resolves to T/F
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    // https://medium.com/ag-grid/a-plain-english-introduction-to-json-web-tokens-jwt-what-it-is-and-what-it-isnt-8076ca679843
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// @route POST /users/delete
// @desc Delete user from MongoDB database
// @access Private (due to auth middleware)
router.delete("/delete", auth, async (req, res) => {
  try {
    // Delete the user by their id
    // Recall that the user property is on the req object because of the auth middleware
    const deleteUser = await User.findByIdAndDelete(req.user);
    return res.json(deletedUser);
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
});

// @route POST /users/tokenIsValid
// @desc Verify a token's legitimacy
// @access Public
router.post("/tokenIsValid", async (req, res) => {
  try {
    // Does the token exist?
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    // Was the token verified/decrypted successfully?
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    // Does a user with that decrypted id exist in the database?
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    // By this part of the function, the token is legit
    return res.json(true);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// @route POST /users/
// @desc Find basic information about a user
// @access Private (due to auth middleware)
router.get("/", auth, async (req, res) => {
  // Recall that the user property is on the req object because of the auth middleware
  // Find a user in the database using the req's object user property containing the decrypted id from the auth middleware
  const user = await User.findById(req.user);
  return res.json({
    username: user.username,
    id: user._id,
  });
});

// @route GET /users/api/myList/:username
// @desc Retrieve a user's liked list
// @access Private (due to auth middleware)
router.get("/api/myList/:username", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    // console.log(user.likes);
    let favorites = user.likes;
    let recent_data_items = [];
    // console.log("size of my favorites: " + favorites.length);

    for (let i = 0; i <= favorites.length; i++) {
      if (i < favorites.length) {
        // Finding the matching song
        let foundSong = await Song.findOne({ _id: favorites[i]._id });
        recent_data_items.push(foundSong);
      } else if (i == favorites.length) {
        // console.log(recent_data_items);
        return res.status(200).json({ likesArray: recent_data_items });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
