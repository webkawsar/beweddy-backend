const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (user)
            return res.status(400).json({
                message: "user already exists",
            });
        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username: Math.random().toString(),
        });
        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({ message: "Something went wrong" });
            }
            if (data) {
                return res.status(201).json({
                    message: "user created successfully",
                });
            }
        });
    });
};

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (error)
            return res.status(400).json({
                error,
            });
        if (user) {
            if (user.authenticate(req.body.password) && user.role === "user") {
                const token = jwt.sign(
                    { _id: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h",
                    }
                );
                const { firstName, lastName, email, role, fullName, _id } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName,
                    },
                });
            } else {
                return res.status(400).json({ message: "invalid Password" });
            }
        } else {
            return res.status(400).json({ message: "something went wrong" });
        }
    });
};



exports.getAllUsers = (req, res) => {
    User.find({role:"user"}).exec((error, users) => {
      if (error) return res.status(400).json({ error });

      if (users) {
        return res.status(200).json({ users });
      }
    });
  };
