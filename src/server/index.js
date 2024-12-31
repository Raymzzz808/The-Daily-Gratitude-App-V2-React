import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Quote from "inspirational-quotes";
import pg from "pg";
import env from "env";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth2";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//COOKIE SESSION:
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//DB Credentials:
env.config();

//PARSE Database:
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
});

//Connect to Database:
db.connect();

//CONSTANTS 4 POSTS:
var authorizedUser = false;
const title = "The Daily Gratitude App";
const saltRounds = 10;

// GET LANDING PAGE (Should be Login Page!):
app.get("/", (req, res) => {
  res.render("/login.ejs", {
    title,
  });
});

// GET LOGIN PAGE:
app.get("/login", (req, res) => {
  res.render("login.ejs", {
    title,
  });
});

// POST THE LOGIN PAGE: -- LOCAL AUTHENTICATION vs DB.
app.post(
  "/login",
  passport.authenticate("local", {
    //Authenticate Locally
    successRedirect: "/home", //If PW + UN Correct -> Redirect to homepage.
    failureRedirect: "/", //Failed? -> Return to Home/Login Page
  })
);

//LOCALIZED DB AUTHENTICATION:
passport.use(
  "local", //ADD 'local'/NAME strategy if using more than 1 Strategy!
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              //Passed password check
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

//GET GOOGLE AUTHENTICATION:
app.get(
  "/auth/google/Daily-Gratitude",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/",
  })
);

//VERIFY GOOGLE AUTHENTICATION:
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/Daily-Gratitude",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query(
          "SELECT * FROM users WHERE username = $1",
          [profile.email]
        );
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)",
            [
              profile.name.givenName,
              profile.name.familyName,
              profile.email,
              "google",
            ] //CAN set google to anything
          );
          return cb(null, newUser.rows[0]);
        } else {
          //WHEN  USER already EXISTS!
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

//GET REGISTRATION PAGE.
app.get("/register", (req, res) => {
  res.render("../views/index.ejs", {
    title,
  });
});

// POST THE REGISTRATION PAGE - >>> LOCALIZED  METHOD:
app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body["firstName"];
  const lastname = req.body["lastName"];

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (username ,firstname,lastname, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [email, firstname, lastname, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/home");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//HOME PAGE:
app.get("/home", async (req, res) => {
  if (req.isAuthenticated()) {
    const result = await db.query("SELECT * FROM entries WHERE user_id = $1", [
      req.user.id,
    ]);
    res.render("index.ejs", {
      entries: result.rows,
    });
  } else {
    res.redirect("/login");
  }
});

//GET a SAVED POST:
app.get("/post/:id", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const result = await db.query(
      "SELECT * FROM entries WHERE id = $1 AND user_id = $2",
      [postId, req.user.id]
    );
    result.rows.length === 0 && res.status(404).send("POST NOT FOUND!");
    const post = result.rows[0];
    res.render("entry", {
      title,
      postTitle: post.title,
      entryTitle: post,
      content,
      date: post.postDate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

async function doesEntryExists(postId) {
  try {
    const result = await db.query(
      "SELECT * FROM entries WHERE id = $1 LIMIT 1",
      [postId]
    );
    return result.rows.length > 0;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// UPDATE or SAVING a NEW ENTRY:
app.post("/submit", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const date = new Date().toLocaleDateString();
    const entryTitle = req.body["entryTitle"];
    const entryContent = req.body["entryContent"];
    const entryExists = await doesPostExist(postId);

    if (entryExists) {
      await db(
        "UPDATE entries SET title = $1, content = $2, postDate = $3  WHERE id = $6 RETURNING *",
        [entryTitle, entryContent, date, postId]
      );
    } else {
      await db.query(
        "INSERT INTO entries (title,content,postDate) VALUES ($1,$2, $3) WHERE user_id = $4 RETURNING * ",
        [entryTitle, entryContent, date, req.user.id]
      );
    }
    const redirectId =
      postId || (await db.query("SELECT lastval()")).rows[0].lastval;
    res.redirect(`/post/${redirectId}`);
  } catch (err) {
    console.log("Error Adding New Entry", err);
    res.status(500).send("Internal Server Error");
  }
});

//DELETE ENTRY
app.post("/delete", async (req, res) => {
  const postId = parseInte(req.param.id);
  try {
    await db.query("DELETE FROM entries WHERE id = $1", [postId]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

//GET MEDITATION PAGE
app.get("/meditate", (req, res) => {
  res.render("meditate.ejs", {
    title,
  });
});

//ABOUT PAGE
app.get("/about", (req, res) => {
  res.render("about.ejs", {
    title,
  });
});

//DONATE PAGE
app.get("/donate", (req, res) => {
  res.render("donate.ejs", {
    title,
  });
});

//SHARE PAGE
app.get("/share", (req, res) => {
  res.render("share.ejs", {
    title,
  });
});

//COOKIE SESSIONS:
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

//PORT LISTENTER:
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
