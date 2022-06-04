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
    getAnnouncementById,
    checkNotStudent,
} = require('../../controllers/announcements/announcement');

router.use(checkNotStudent);

router
    .route('/')
    .get(getAllAnnouncements) //this will also have the user search query where if true then it will return user announcements

    .post(uploader.single('poster'), makeAnnouncement);

router
    .route('/:id')
    .get(getAnnouncementById)
    .patch(checkAuthor, uploader.single('poster'), editAnnouncement)
    .delete(checkAuthor, deleteAnnouncement);
module.exports = router;
