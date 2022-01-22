const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../../cloudinary");
const upload = multer({ storage });

const cafetariaController = require("../../controllers/cafetaria/cafetaria");

const roleMiddleware = require("../../middleWare/cafetaria/role_handlers");

router
    .route("/")
    .get(cafetariaController.getMenu)
    .post(
        roleMiddleware.isOther,
        upload.single("image"),
        cafetariaController.newMenuItem
    );

router.route("/recommendation").get(cafetariaController.getRecommendation);

router
    .route("/:menuId")
    .get(cafetariaController.getMenuItem)
    .patch(
        roleMiddleware.isOther,
        upload.single("image"),
        cafetariaController.editMenu
    )
    .delete(roleMiddleware.isOther, cafetariaController.deleteMenuItem);

router
    .route("/:menuId/rate")
    .post(roleMiddleware.isStudentOrFaculty, cafetariaController.rating);

router
    .route("/:menuId/isAvailable")
    .post(roleMiddleware.isOther, cafetariaController.updateIsAvailable);

module.exports = router;
