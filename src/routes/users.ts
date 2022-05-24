import { Request, Response } from "express";
import storage from "node-persist";
import { v4 as uuidv4 } from "uuid";

const express = require("express");
const router = express.Router();

(async () => {
  "use strict";

  let options = { dir: "/Services/storage" };
  await storage.init(options);
  // CRUD

  // Create [POST]
  // // Create user - POST
  router.post("/", async (req: Request, res: Response) => {
    let u = req.body;
    let id = uuidv4();
    u.id = id;
    u.updated = new Date();
    await storage.setItem(id, u);
    res.statusCode = 201;
    res.json(u);
  });

  // // Read users - GET
  router.get("/", async (req: Request, res: Response) => {
    let users = await storage.values();
    res.json(users);
  });

  // // Read user by id - GET
  router.get("/:id", async (req: Request, res: Response) => {
    let id = req.params.id;
    let user = await storage.getItem(id);
    res.json(user);
  });

  // // Edit - PUT
  router.put("/:id", async (req: Request, res: Response) => {
    let id = req.params.id;
    let original = await storage.getItem(id);
    let updated = { ...original, ...req.body, updated: new Date() };
    await storage.updateItem(original.id, updated);
    res.statusCode = 200;
    res.json(updated);
  });

  // // Delete - DELETE
  router.get("/:id", async (req: Request, res: Response) => {
    let id = req.params.id;
    let user = await storage.removeItem(id);
    res.statusCode = 204;
    res.json(user);
  });
})();

module.exports = router;
