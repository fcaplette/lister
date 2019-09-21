const express = require("express");
const next = require("next");

// Determine if the env is dev or prod
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    const PORT = process.env.PORT || 9000;

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Server running on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
