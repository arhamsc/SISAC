//stationary controllers.
const Availability = require("../../models/stationary/availability");
const BookMaterial = require("../../models/stationary/book_material");
const AvailableMaterial = require("../../models/stationary/available_material");

const { cloudinary } = require("../../cloudinary");
const { ExpressError } = require("../../middleWare/error_handlers");

//to get available bluebooks and records
module.exports.getAvailability = async (req, res, next) => {
    try {
        const items = await Availability.find();
        res.json({ ...items });
    } catch (error) {
        next(new ExpressError("Could not fetch availability", 400));
    }
};

//below route to edit the availability of blue book or record
//send isAvailable in req body
module.exports.updateAvailability = async (req, res, next) => {
    try {
        const { itemId } = req.params;
        const { isAvailable } = req.body;
        const item = await Availability.findByIdAndUpdate(
            itemId,
            { isAvailable: isAvailable },
            { new: true }
        );
        await item.save();
        res.json({ message: "Availability Updated" });
    } catch (error) {
        next(new ExpressError("Could not update"), 500);
    }
};

//* ***** Available Books Route ***** *//
//fetch all books
module.exports.getBooks = async (req, res, next) => {
    try {
        const books = await BookMaterial.find();
        res.json({ ...books });
    } catch (error) {
        next(new ExpressError("Could not fetch the books"), 400);
    }
};

//make new book material
//* send the request in format of book[ ].
module.exports.addBook = async (req, res, next) => {
    try {
        const { book } = req.body;
        const newBook = new BookMaterial({ ...book });
        newBook.imageUrl = req.file.path;
        newBook.imageFileName = req.file.filename;
        await newBook.save();
        res.json({ newBook });
    } catch (error) {
        next(new ExpressError("Could not make new book"), 400);
    }
};

//editing present book
//* send the request in format of book[ ].
/* 
Ex:
book[name]:Medical
book[author]:Asrith
book[edition]:2
book[price]:5000
*/
module.exports.editBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const { book } = req.body;
        const oldBook = await BookMaterial.findById(bookId);
        const newBook = await BookMaterial.findByIdAndUpdate(
            bookId,
            { ...book },
            { new: true }
        );
        //if there is a new file uploaded then it will update the image file url and name
        if (req.file) {
            await cloudinary.uploader.destroy(oldBook.imageFileName);
            newBook.imageUrl = req.file.path;
            newBook.imageFileName = req.file.filename;
        }
        await newBook.save();
        res.json({ newBook, message: "Book Edited" });
    } catch (error) {
        next(new ExpressError("Could not edit book"), 400);
    }
};

//route for deleting the book
module.exports.deleteBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const book = await BookMaterial.findByIdAndDelete(bookId);
        await cloudinary.uploader.destroy(book.imageFileName);
        res.json({ message: "Book Deleted" });
    } catch (error) {
        next(new ExpressError("Could not delete", 400));
    }
};

//* ***** Available Material Route ***** *//
//route to fetch all the available materials
module.exports.getAllMaterials = async (req, res, next) => {
    try {
        const materials = await AvailableMaterial.find();
        res.json({ ...materials });
    } catch (error) {
        next(new ExpressError("Materials not found", 404));
    }
};

//route to make new materials
//* send the request in format of material[ ].
module.exports.addMaterial = async (req, res, next) => {
    try {
        const { material } = req.body;
        const newMaterial = new AvailableMaterial({ ...material });
        newMaterial.imageUrl = req.file.path;
        newMaterial.imageFileName = req.file.filename;
        await newMaterial.save();
        res.json(newMaterial);
    } catch (error) {
        next(new ExpressError("Could not make the item", 404));
    }
};

//route to edit the material
module.exports.editMaterial = async (req, res, next) => {
    try {
        const { materialId } = req.params;
        const { material } = req.body;
        const oldMaterial = await AvailableMaterial.findById(materialId);
        const newMaterial = await AvailableMaterial.findByIdAndUpdate(
            materialId,
            { ...material },
            { new: true }
        );
        //if there is a new file uploaded then it will update the image file url and name
        if (req.file) {
            await cloudinary.uploader.destroy(oldMaterial.imageFileName);
            newMaterial.imageUrl = req.file.path;
            newMaterial.imageFileName = req.file.filename;
        }
        await newMaterial.save();
        res.json({ newMaterial, message: "Material Edited" });
    } catch (error) {
        next(new ExpressError("Could not edit material"), 400);
    }
};

//route to delete material
module.exports.deleteMaterial = async (req, res, next) => {
    try {
        const { materialId } = req.params;
        const material = await AvailableMaterial.findByIdAndDelete(materialId);
        await cloudinary.uploader.destroy(material.imageFileName);
        res.json({ message: "Material deleted" });
    } catch (error) {
        next(new ExpressError("Could not delete Item"), 400);
    }
};
