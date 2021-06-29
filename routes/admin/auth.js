const express = require("express");
const { protect } = require("../../common-middleware");
const { signup, signin, signout, getAllAdmin } = require("../../Controllers/admin/auth");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidate,
} = require("../../validators/auth");
const router = express.Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidate, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidate, signin);
router.post("/admin/signout", protect, signout);
router.get("/admin/getAllAdmin", protect, getAllAdmin);

module.exports = router;
