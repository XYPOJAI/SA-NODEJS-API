"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
// import { profileSchema } from "./validate";
// const Joi = require("joi");
const mongoose = require("mongoose");
const Profile = require("../config/profileSchema");
const express = require("express");
const router = express.Router();
(async () => {
  "use strict";
  // CRUD
  // Create [POST]
  router.post("/", async (req, res) => {
    const profile = new Profile({
      ...req.body,
      id: req.body.id == "" ? (0, uuid_1.v4)() : req.body.id,
      created: new Date(),
      updated: new Date(),
    });
    console.log(profile);
    //
    await profile.save((err) => {
      if (err) return console.log(err);
      res.status(201).json(profile);
    });
  });
  // Read [GET] all profiles
  router.get("/", async (req, res) => {
    let profiles = await Profile.find({});
    res.json(profiles).status(200);
  });
  // Read [GET] profile by id
  router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let profile = await Profile.findOne({ id: id });
    if (!profile) return res.json({ id: id, status: 404 }).status(404);
    res.json(profile).status(200);
    // let profile = await storage.getItem(id);
    // if (!profile) res.status(404).send(`Profile does not exist (id: ${id})`);
    // res.json(profile).status(200);
  });
  // Update [PUT] profile by id
  router.put("/", async (req, res) => {
    const id = req.body.id;
    let response = await Profile.findOneAndUpdate(
      { id: id },
      { ...req.body, updated: new Date() }
    );
    // if (!original) res.status(404).send(`Profile not found (id: ${id})`);
    // let updated = { ...original, ...req.body, updated: new Date() };
    // await storage.updateItem(id, updated);
    if (!response) return res.status(404).send(`Profile not found (id: ${id})`);
    res.json(response).status(200);
  });
  // Delete [DELETE] profile by id
  router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let response = await Profile.findOneAndDelete({ id: id });
    // let profile = await storage.removeItem(id);
    // if (profile.existed) res.statusCode = 200;
    // else res.statusCode = 404;
    // res.json({ id, existed: profile.existed, deleted: profile.removed });
    if (!response) return res.status(404).send(`Profile not found (id: ${id})`);
    res.json(response);
  });
})();
module.exports = router;
//# sourceMappingURL=profiles.js.map
