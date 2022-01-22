const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../../cloudinary");
const upload = multer({ storage });

const stationaryController = require("../../controllers/stationary/stationary");

router.route("/availability").get(stationaryController.getAvailability);

router
    .route("/availability/:itemId")
    .patch(stationaryController.updateAvailability);

router
    .route("/booksmaterial")
    .get(stationaryController.getBooks)
    .post(upload.single("image"), stationaryController.addBook);

router
    .route("/booksmaterial/:bookId")
    .patch(upload.single("image"), stationaryController.editBook)
    .delete(stationaryController.deleteBook);

router
    .route("/availablematerial")
    .get(stationaryController.getAllMaterials)
    .post(upload.single("image"), stationaryController.addMaterial);

router
    .route("/availablematerial/:materialId")
    .patch(upload.single("image"), stationaryController.editMaterial)
    .delete(stationaryController.deleteMaterial);

module.exports = router;
