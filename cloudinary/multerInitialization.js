const multer = require('multer');
const { storageFunc } = require('./index');

const uploaderFunc = (path) => {
    const storage = storageFunc(path);

    const uploader = multer({ storage });
    return uploader;
}

module.exports = { uploaderFunc };
