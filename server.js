const express = require("express");

const app = express();

// Use environment port if available (Heroku/Render/etc.), otherwise 3000
const PORT = process.env.PORT || 3000;

/**
 * ROUTING
 */

// Root route
app.get("/", (req, res) => {
  res.type("text").send("Hello World");
});

// About route
app.get("/about", (req, res) => {
  res.type("text").send("About page");
});

/**
 * CONDITIONAL ROUTING: /foo
 * 1st handler randomly responds or calls next()
 */
app.get("/foo", (req, res, next) => {
  const random = Math.random(); // 0 to 1
  if (random < 0.5) {
    return res.type("text").send("sometimes this");
  }
  // pass control to next matching route
  next();
});

// 2nd handler for /foo
app.get("/foo", (req, res) => {
  res.type("text").send("and sometimes that");
});

/**
 * REGEX ROUTE
 * Matches /user and /username
 * Explanation: /user(name)? => "name" is optional
 */
app.get(/^\/user(name)?$/, (req, res) => {
  res.type("text").send("Matched /user or /username using regex route");
});

/**
 * DYNAMIC ROUTE
 * Example: /user/john => "Hello john"
 * Note: This is different from the regex route above.
 */
app.get("/user/:username", (req, res) => {
  const { username } = req.params;
  res.type("text").send(`Hello ${username}`);
});

/**
 * QUERY STRING HANDLING
 * Example: /get?name=alex&age=30
 */
app.get("/get", (req, res) => {
  console.log("Query params:", req.query);
  res.type("text").send("Check console for query params");
});

/**
 * 404 HANDLER (must be last)
 */
app.use((req, res) => {
  res.status(404).type("text").send("404 - Not Found");
});

/**
 * SERVER START
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
