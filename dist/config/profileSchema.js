"use strict";
const { Schema, model } = require("mongoose");
const ProfileSchema = new Schema({
    id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    department: { type: String },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        ZIP: { type: String },
        country: { type: String },
    },
    created: { type: Date },
    updated: { type: Date },
});
const Profile = model("Profile", ProfileSchema);
module.exports = Profile;
//# sourceMappingURL=profileSchema.js.map