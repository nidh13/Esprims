const express = require("express");
const router = express.Router();
const auth = require("../../../serveur/middleware/auth");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const User = require("../../../serveur/models/User");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

// @route Get api/auth/current
// @desc Test route
// @access Public

router.get("/current", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

// @route POST api/auth
router.post(
    "/",
    [
        check("email", "Please enter a valid Email").isEmail(),
        check("password", "Password is required").exists()
    ],
    async (req, res) => {
        //Check errors in  the body

        const errors = validationResult(req);

        //Bad Request
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;
        //ParserBody
        try {
            // See if user exists
            let user = await User.findOne({
                email
            });
            if (!user) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Invalid Credentials "
                        }
                    ]
                });
            }

            //See if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Invalid Credentials "
                        }
                    ]
                });
            }

            // Return Json WebToken
            const payload = {
                user: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    avatar: user.avatar,
                }
            }; //l'emport
            jwt.sign(
                payload,
                config.authentification.secret,
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                    });
                }
            );
        } catch (error) {
            console.log(error.message);
            res.status(500).send("server Error");
        }
    }
);

module.exports = router;
