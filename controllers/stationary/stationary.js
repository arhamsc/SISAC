//stationary controllers.
const Availability = require('../../models/stationary/availability');
const BookMaterial = require('../../models/stationary/book_material');

const { cloudinary } = require('../../cloudinary');
const { ExpressError } = require('../../middleWare/error_handlers');

//to get available bluebooks and records
module.exports.getAvailability = async(req, res, next) => {
   try {
    const items =  await Availability.find();
    res.json({...items});
   } catch(error) {
       next(new ExpressError('Could not fetch availability', 400));
   }
}

//below route to edit the availability of blue book or record
//send isAvailable in req body
module.exports.updateAvailability = async(req, res, next) => {
    try {
        const {itemId} = req.params;
        const {isAvailable} = req.body;
        const item = await Availability.findByIdAndUpdate(itemId, {isAvailable: isAvailable}, {new: true});
        await item.save();
        res.json({message: "Availability Updated"});
    } catch(error) {
        next(new ExpressError('Could not update'), 500);
    }
}

//* ***** Available Books Route ***** *//
//fetch all books
module.exports.getBooks = async(req, res, next) => {
    try {
        const books = await BookMaterial.find();
        res.json({...books});
    } catch(error) {
        next(new ExpressError('Could not fetch the books'), 400);
    }
}

//make new book material
module.exports.addBook = async(req, res, next) => {
    try {
        const { book } = req.body;
        const newBook = new BookMaterial({...book});
        newBook.imageUrl = req.file.path;
        newBook.imageFileName = req.file.filename;
        await newBook.save();
        res.json({newBook});
    } catch(error) {
        next(new ExpressError('Could not make new book'), 400);
    }
}

//editing present book
module.exports.editBook  = async(req, res, next) => {
    try {
        const  {bookId}  = req.params;
        const { book } = req.body;
        const oldBook = await BookMaterial.findById(bookId);
        const newBook = await BookMaterial.findByIdAndUpdate(bookId, {...book}, {new: true});
        if(req.file) {
            await cloudinary.uploader.destroy(oldBook.imageFileName);
            newBook.imageUrl = req.file.path;
            newBook.imageFileName = req.file.filename;
        }
        await newBook.save();
        res.json({newBook, message: "Book Edited"});
    } catch(error) {
        next(new ExpressError('Could not edit book'), 400 );
    }
}

//route for deleting the book
module.exports.deleteBook = async(req, res, next) => {
    try{
        const { bookId } = req.params;
        const book = await BookMaterial.findByIdAndDelete(bookId);
        await cloudinary.uploader.destroy(book.imageFileName);
        res.json({message: "Book Deleted"});
    } catch (error) {
        next(new ExpressError("Could not delete", 400));
    }
}