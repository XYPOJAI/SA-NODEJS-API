"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
exports.Profile = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    phone: String,
    department: String,
    address: {
        street: String,
        city: String,
        state: String,
        ZIP: String,
        country: String,
    },
    created: Date,
    updated: Date,
});
//# sourceMappingURL=profileScheme.js.map