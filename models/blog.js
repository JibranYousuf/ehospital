"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    author: {
        id: String,
        username: String,
        email: String
    },
    date: String,
    description: String,
    isPublished: Boolean
});
var blog = mongoose.model('blog', blogSchema);
exports.default = blog;