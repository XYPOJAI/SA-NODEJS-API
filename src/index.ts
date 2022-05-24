const express = require("express");
const storage = require("node-persist");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const router = express.Router();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const profileRouter = require("./routes/profiles");
const PORT = process.env.PORT || 80; //3000
//CRUD - Create Read Update Delete
(async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  let options = { dir: "./storage" };
  await storage.init(options);

  // app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/profiles", profileRouter);

  app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
  });
})();

module.exports = router;
