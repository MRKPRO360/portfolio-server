"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mailSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Mail = (0, mongoose_1.model)('Mail', mailSchema);
exports.default = Mail;
