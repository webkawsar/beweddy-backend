const express = require("express");
const { protect } = require("../common-middleware");
const router = express.Router();

//controller
const questionsController = require("../Controllers/questionsController");



router.post(
    "/questions/",
    questionsController.createWeddyProfile
);
router.get("/dashboard/:slug", questionsController.getDashboardBySlug);
router.get("/dashboard/:profileId", questionsController.getDashboardDetailsById);
router.get("/dashboard/getDashboardAllData", questionsController.getDashboardAllData);

module.exports = router;
