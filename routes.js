"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var course_1 = require("./controllers/course");
var user_1 = require("./controllers/user");
var blog_1 = require("./controllers/blog");
var middlewares_1 = require("./middlewares");

var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: './public/uploads/title/',
    filename: function (req, file, cb) {
        cb(null, req.params.courseId + path.extname(file.originalname));
    }
});
function setRoutes(app) {
    var upload = multer({ storage: storage });
    var router = express.Router();
    var courseCtrl = new course_1.default();
    var userCtrl = new user_1.default();
    var blogCtrl = new blog_1.default();
    var middleWare = new middlewares_1.default();
    router.route('/user/:id').put(middleWare.hash);


    // courses
    router.route('/courses').get(courseCtrl.getAll);
    router.route('/courses/count').get(courseCtrl.count);
    router.route('/course/syllabus/:id').get(courseCtrl.getSyllabus);
    router.route('/course/content/:id').get(courseCtrl.getContent);
    router.route('/course').post(courseCtrl.insert);
    router.route('/courses/shallow').get(courseCtrl.getAllShallow);
    router.route('/course/:id').get(courseCtrl.get);
    router.route('/course/:id').put(courseCtrl.update);
    router.route('/course/addUser/:id').put(courseCtrl.addUser);
    router.route('/course/:id').delete(courseCtrl.delete);
    router.route('/course/payment').post(courseCtrl.payment);
    // router.route('/course/coupon').post(courseCtrl.verifyCoupon);
    router.route('/course/getUsers/:id').get(courseCtrl.getUsers);


    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/login').post();
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);

    /* blogs */

    // get (all)
    router.route('/blogs').get(blogCtrl.getAll);

    //count
    router.route('/blogs/count').get(blogCtrl.count);

    router.route('/blogs/shallow').get(blogCtrl.getAllShallow);

    // insert
    router.route('/blog').post(blogCtrl.insert);

    // get one
    router.route('/blog/:id').get(blogCtrl.get);

    // edit
    router.route('/blog/:id').put(blogCtrl.update);

    // delete
    router.route('/blog/:id').delete(blogCtrl.delete);

    

    // Apply the routes to our applicourseion with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map