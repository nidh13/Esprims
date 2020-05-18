const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();
const {check, validationResult} = require("express-validator/check");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

router.get("/", async (req, res) => {
    User.find({})
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});
// @route POST api/users
// @desc Register User
// @access Public
router.post("/register", async (req, res) => {
    const errors = validationResult(req);
    //Bad Request
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {name, email, password, role} = req.body;

    try {
        // See if user exists
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "User already exists"
                    }
                ]
            });
        }
        // Get User Avatar
        const avatar = gravatar.url(email, {
            s: "200", //default size
            r: "pg", //reading
            d: "mm" //gives default image
        });
        user = new User({
            name,
            email,
            avatar,
            password,
            role
        });

        // Encrypt Password
        const salt = await bcrypt.genSalt(10); //the more you have , the more secure but the more slower
        user.password = await bcrypt.hash(password, salt);

        // Save user
        await user.save();
        //res.send("User registred");


        // Return Json WebToken
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
                avatar: user.role
            }
        };
        jwt.sign(
            payload,
            config.authentification.secret,
            {
                expiresIn: 360000
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send("server Error");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) res.json(user);
        else {
            res.status(404).json({
                msg: "User not found "
            });
        }
    } catch (err) {
        if (err.kind == "ObjectId") {
            res.status(404).json({
                msg: "User not found "
            });
        }
        console.error(err.message);
        res.status(500).send("server error");
    }
});
module.exports = router;
