const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storageFunc } = require("../../cloudinary");
const storage = storageFunc("/stationary")
const upload = multer({ storage });

const roleHandler = require("../../middleWare/cafetaria/role_handlers");

const stationaryController = require("../../controllers/stationary/stationary");

router.route("/availability").get(stationaryController.getAvailability);

router
  .route("/availability/:itemId")
  .patch(roleHandler.isStationary, stationaryController.updateAvailability);

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
