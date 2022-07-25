// Dependencies
// =============================================================
var express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const User = require ("./model/users")
const Post = require ("./model/posts")

dotenv.config();
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4000;

//DB connection 

mongoose.connect(process.env.MONGODB_HOST, {
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(db=> console.log('db connected'))
.catch(err=> console.log(err))


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


// CryptoBlogD (TEST DATA)
// =============================================================
/*var users = [
  {
    correo: "Yoda@jedimaster.com",
    password: "may4thbewithyou",
    userName: "cryptoMaster",
    idioma: "English",
    moneda: "USD",
    deleteFlag: false
  },
  {
    routeName: "test",
    correo: "test@test.com",
    password: "test",
    userName: "test",
    idioma: "English",
    moneda: "USD",
    deleteFlag: false
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
 */

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.send("Crypto Blog D API!");
});


// Displays all users
app.get("/profile", async function(req, res) {
  const profiles = await User.find();
  return res.json(profiles);
});

// Displays a single user profile, or returns false
app.get("/profile/:user", async function(req, res) {
  var chosen = req.params.user;

  console.log(chosen);

  const profile = await User.findOne({userName:chosen})

  if (profile){
    return res.json(profile);
  }
  else{
    return res.json({msg:"No existe informacion de este usuario"});
  }
  /* 
  for (var i = 0; i < users.length; i++) {
    if (chosen === users[i].routeName) {
      return res.json(users[i]);
    }
  }
*/
  
});

// Create New user - takes in JSON input
app.post("/users", async function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newuser = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  //newuser.userName = newuser.name.replace(/\s+/g, "").toLowerCase();

  console.log(newuser);

  const usr = new User(newuser)
  try {
  await usr.save()
}
catch(err){
  console.log(err)
}

  res.json(newuser);
});

//create new post
app.post("/newpost",async function(req, res){
 var newpost = req.body;
 const post = new Post(newpost)

try{ 
  await post.save()
}
catch(err){
  console.log(err)
}
 posts.push(newpost);
 res.json(newpost);

}); 

// Displays all posts
app.get("/posts", function(req, res) {
    return res.json(posts);
  });

// deletes account

app.get("/delete/:user", async function(req, res){
  var chosen = req.params.user;
  const profile = await User.findOne({username:chosen})

  if (profile){
    await profile.delete();
  }
  else{
    return res.json({msg:"No existe informacion de este usuario"});
  }

})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
