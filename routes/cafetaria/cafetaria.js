const express = require('express');
const router = express.Router();

const multer = require('multer');
const {storage} = require('../../cloudinary');
const upload = multer({storage});

const cafetariaController = require('../../controllers/cafetaria/cafetaria');

router.route('/')
    .get(cafetariaController.getMenu)
    .post(upload.single('image'), cafetariaController.newMenuItem);

router.route('/:menuId')
    .get(cafetariaController.getMenuItem)
    .patch(upload.single('image'), cafetariaController.editMenu)
    .delete(cafetariaController.deleteMenuItem);

router.route('/:menuId/rate')
    .post(cafetariaController.rating)
    

module.exports = router;