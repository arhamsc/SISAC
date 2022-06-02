const router = require('express').Router();
const multer = require('multer');

const { storageFunc } = require('../../cloudinary');
const storage = storageFunc('announcements');
const uploader = multer({ storage });

const { checkAuthor } = require('../../middleWare/announcements/checkAuthor');

const {
    getAllAnnouncements,
    makeAnnouncement,
    editAnnouncement,
    deleteAnnouncement,
} = require('../../controllers/announcements/announcement');

router
    .route('/')
    .get(getAllAnnouncements)
    .post(uploader.single('poster'), makeAnnouncement);

router
    .route('/:id')
    .patch(checkAuthor, uploader.single('poster'), editAnnouncement)
    .delete(deleteAnnouncement);
module.exports = router;
