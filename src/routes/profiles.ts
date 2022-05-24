import { Request, Response } from "express";
import storage from "node-persist";
import { v4 as uuidv4 } from "uuid";
import IProfile from "../types/IProfile";
// import { profileSchema } from "./validate";
// const Joi = require("joi");

const express = require("express");
const router = express.Router();

(async () => {
  "use strict";

  let options = { dir: "/Services/storage" };
  await storage.init(options);
  // CRUD

  // Create [POST]
  router.post("/", async (req: Request, res: Response) => {
    const profile: IProfile = {
      id: uuidv4(),
      ...req.body,
      created: new Date(),
      updated: new Date(),
    };
    // const { error, value } = await profileSchema.validate(profile, {
    //   abortEarly: false,
    // });
    // if (error)
    //   return res.status(400).json({
    //     value: value,
    //     errors: error.details.map((json: any) => json.message),
    //   });
    const save = await storage.setItem(profile.id, profile);
    res.status(201).json(save.content.value);
  });

  // Read [GET] all profiles
  router.get("/", async (req: Request, res: Response) => {
    let profiles = await storage.values();
    if (!profiles.length) return res.status(200).send("No profiles exist");
    res.json(profiles).status(200);
  });

  // Read [GET] profile by id
  router.get("/:id", async (req: Request, res: Response) => {
    let id = req.params.id;
    let profile = await storage.getItem(id);
    if (!profile) res.status(404).send(`Profile does not exist (id: ${id})`);
    res.json(profile).status(200);
  });

  // Update [PUT] profile by id
  router.put("/", async (req: Request, res: Response) => {
    const id = req.body.id;
    let original = await storage.getItem(id);

    if (!original) res.status(404).send(`Profile not found (id: ${id})`);
    let updated = { ...original, ...req.body, updated: new Date() };
    await storage.updateItem(id, updated);
    res.json(updated).status(200);
  });

  // Delete [DELETE] profile by id
  router.delete("/:id", async (req: Request, res: Response) => {
    let id = req.params.id;

    let profile = await storage.removeItem(id);
    if (profile.existed) res.statusCode = 200;
    else res.statusCode = 404;

    res.json({ id, existed: profile.existed, deleted: profile.removed });
  });
})();

module.exports = router;
