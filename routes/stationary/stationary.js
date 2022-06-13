const express = require("express");
const router = express.Router();

const uploader = require('../../cloudinary/multerInitialization').uploaderFunc(
    'announcements',
);

const roleHandler = require("../../middleWare/cafetaria/role_handlers");

const stationaryController = require("../../controllers/stationary/stationary");

router.route("/availability").get(stationaryController.getAvailability);

router
  .route("/availability/:itemId")
  .patch(roleHandler.isStationary, stationaryController.updateAvailability);

router
  .route("/booksmaterial")
  .get(stationaryController.getBooks)
  .post(uploader.single("image"), stationaryController.addBook);

router
  .route("/booksmaterial/:bookId")
  .patch(uploader.single("image"), stationaryController.editBook)
  .delete(stationaryController.deleteBook);


router
  .route("/availablematerial")
  .get(stationaryController.getAllMaterials)
  .post(uploader.single("image"), stationaryController.addMaterial);

router
  .route("/availablematerial/:materialId")
  .patch(uploader.single("image"), stationaryController.editMaterial)
  .delete(stationaryController.deleteMaterial);

module.exports = router;
