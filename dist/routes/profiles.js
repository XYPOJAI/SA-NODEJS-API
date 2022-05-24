"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_persist_1 = __importDefault(require("node-persist"));
const uuid_1 = require("uuid");
// import { profileSchema } from "./validate";
// const Joi = require("joi");
const express = require("express");
const router = express.Router();
(async () => {
    "use strict";
    let options = { dir: "/Services/storage" };
    await node_persist_1.default.init(options);
    // CRUD
    // Create [POST]
    router.post("/", async (req, res) => {
        const profile = {
            id: (0, uuid_1.v4)(),
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
        const save = await node_persist_1.default.setItem(profile.id, profile);
        res.status(201).json(save.content.value);
    });
    // Read [GET] all profiles
    router.get("/", async (req, res) => {
        let profiles = await node_persist_1.default.values();
        if (!profiles.length)
            return res.status(200).send("No profiles exist");
        res.json(profiles).status(200);
    });
    // Read [GET] profile by id
    router.get("/:id", async (req, res) => {
        let id = req.params.id;
        let profile = await node_persist_1.default.getItem(id);
        if (!profile)
            res.status(404).send(`Profile does not exist (id: ${id})`);
        res.json(profile).status(200);
    });
    // Update [PUT] profile by id
    router.put("/", async (req, res) => {
        const id = req.body.id;
        let original = await node_persist_1.default.getItem(id);
        if (!original)
            res.status(404).send(`Profile not found (id: ${id})`);
        let updated = { ...original, ...req.body, updated: new Date() };
        await node_persist_1.default.updateItem(id, updated);
        res.json(updated).status(200);
    });
    // Delete [DELETE] profile by id
    router.delete("/:id", async (req, res) => {
        let id = req.params.id;
        let profile = await node_persist_1.default.removeItem(id);
        if (profile.existed)
            res.statusCode = 200;
        else
            res.statusCode = 404;
        res.json({ id, existed: profile.existed, deleted: profile.removed });
    });
})();
module.exports = router;
//# sourceMappingURL=profiles.js.map