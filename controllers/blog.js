"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({
                __proto__: []
            }
            instanceof Array && function (d, b) {
                d.__proto__ = b;
            }) ||
        function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p)) d[p] = b[p];
        };
    return function (d, b) {
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", {
    value: true
});
var blog_1 = require("../models/blog");
var base_1 = require("./base");
var blogCtrl = /** @class */ (function (_super) {
    __extends(blogCtrl, _super);

    function blogCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = blog_1.default;

        _this.getAllShallow = function (req, res) {
            _this.model.find({
                isPublished: false
            }, {
                content: 0
            }, function (err, docs) {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(docs);
            });
        };
        _this.getAll = function (req, res) {
            _this.model.find({
                isPublished: true
            }, {
                syllabus: 0,
                content: 0
            }, function (err, docs) {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(docs);
            });
        };
        return _this;
    }
    return blogCtrl;
}(base_1.default));
exports.default = blogCtrl;
//# sourceMappingURL=blog.js.map