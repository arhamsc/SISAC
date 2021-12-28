const express = require('express');
const router = express.Router();

const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

const cafetariaController = require('../controllers/cafetaria');

router.route('/')
    .get(cafetariaController.getMenu)
    .post(upload.single('image'), cafetariaController.newMenu);


module.exports = router;