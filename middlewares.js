"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var user_1 = require("./models/user");
var MiddleWare = /** @class */ (function () {
    function MiddleWare() {
        this.model = user_1.default;
        this.hash = function (req, res, next) {
            if (req.body.password) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return next(err);
                    }
                    bcrypt.hash(req.body.password, salt, function (error, hash) {
                        if (error) {
                            return next(error);
                        }
                        req.body.password = hash;
                        next();
                    });
                });
            }
            else {
                next();
            }
        };
    }
    return MiddleWare;
}());
exports.default = MiddleWare;
//# sourceMappingURL=middlewares.js.map