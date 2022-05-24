"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_persist_1 = __importDefault(require("node-persist"));
const uuid_1 = require("uuid");
const express = require("express");
const router = express.Router();
(async () => {
    "use strict";
    let options = { dir: "/Services/storage" };
    await node_persist_1.default.init(options);
    // CRUD
    // Create [POST]
    // // Create user - POST
    router.post("/", async (req, res) => {
        let u = req.body;
        let id = (0, uuid_1.v4)();
        u.id = id;
        u.updated = new Date();
        await node_persist_1.default.setItem(id, u);
        res.statusCode = 201;
        res.json(u);
    });
    // // Read users - GET
    router.get("/", async (req, res) => {
        let users = await node_persist_1.default.values();
        res.json(users);
    });
    // // Read user by id - GET
    router.get("/:id", async (req, res) => {
        let id = req.params.id;
        let user = await node_persist_1.default.getItem(id);
        res.json(user);
    });
    // // Edit - PUT
    router.put("/:id", async (req, res) => {
        let id = req.params.id;
        let original = await node_persist_1.default.getItem(id);
        let updated = { ...original, ...req.body, updated: new Date() };
        await node_persist_1.default.updateItem(original.id, updated);
        res.statusCode = 200;
        res.json(updated);
    });
    // // Delete - DELETE
    router.get("/:id", async (req, res) => {
        let id = req.params.id;
        let user = await node_persist_1.default.removeItem(id);
        res.statusCode = 204;
        res.json(user);
    });
})();
module.exports = router;
//# sourceMappingURL=users.js.map