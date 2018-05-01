"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require("mongoose");
var courseSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    eta: String,
    description: String,
    isPublished: Boolean,
    userCount: Number,
    syllabus: String,
    users: [String],
    syllabusFile: String,
    coupons: [{
        id: String,
        amount: Number
    }],
    content: {
        chapters: [{
            title: String,
            preview: Boolean,
            resources: [{
                name: String,
                link: String
            }],
            lessons: [{
                title: String,
                content: String,
                contentFile: String,
                image: String,
                video: String
            }]
        }]
    }
});
var course = mongoose.model('course', courseSchema);
exports.default = course;
//# sourceMappingURL=course.js.map