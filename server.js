// Dependencies
// =============================================================
var express = require("express");
var cors = require("cors")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4000;
 
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


// CryptoBlogD (TEST DATA)
// =============================================================
var users = [
  {
    routeName: "yoda",
    correo: "Yoda@jedimaster.com",
    password: "may4thbewithyou",
    userName: "cryptoMaster",
    idioma: "English",
    moneda: "USD"
  },
  {
    routeName: "test",
    correo: "test@test.com",
    password: "test",
    userName: "test",
    idioma: "English",
    moneda: "USD"
  }
];

var posts = [
 {
  userName:"test",
  postContent:"This is a sample post"
 },
 {
  userName:"test",
  postContent:"This is a sample post 2"
 }]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.send("Crypto Blog D API!");
});


// Displays all users
app.get("/profile", function(req, res) {
  return res.json(users);
});

// Displays a single user profile, or returns false
app.get("/profile/:user", function(req, res) {
  var chosen = req.params.user;

  console.log(chosen);

  for (var i = 0; i < users.length; i++) {
    if (chosen === users[i].routeName) {
      return res.json(users[i]);
    }
  }

  return res.json(false);
});

// Create New user - takes in JSON input
app.post("/users", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newuser = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newuser.routeName = newuser.name.replace(/\s+/g, "").toLowerCase();

  console.log(newuser);

  users.push(newuser);

  res.json(newuser);
});

//create new post
app.post("/newpost",function(req, res){
 var newpost = req.body;
 posts.push(newpost);
 res.json(newpost);
}); 

// Displays all posts
app.get("/posts", function(req, res) {
    return res.json(posts);
  });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
