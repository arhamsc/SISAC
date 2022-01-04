const MenuItem = require('../../models/cafetaria/menu_item');
const Rating = require('../../models/cafetaria/rating');
const helpers = require('../../middleWare/helpers');
const { cloudinary } = require('../../cloudinary');
const { ExpressError } = require('../../middleWare/error_handlers');


//get whole menu controller
module.exports.getMenu = async (req, res) => {
    try {
        const items = await MenuItem.find({});
        res.json({ ...items });
    } catch (e) {
        res.json(e);
    }
}

//*send json in type of menuItem[name]
module.exports.newMenuItem = async (req, res) => {
    try {
        const body = req.body.menuItem;
        if (!body) throw new ExpressError("Body cannot be empty", 400);
        const newItem = await new MenuItem(body);
        newItem.imageUrl = req.file.path;
        newItem.imageFileName = req.file.filename;
        await newItem.save();
        res.json({ newItem, message: "Item added" });
    } catch (error) {
        res.json(error);
    }
}

//get single item
module.exports.getMenuItem = async (req, res) => {
    try {
        const { menuId } = req.params;
        const item = await MenuItem.findById(menuId);
        res.json({ item, message: "Item Found" });
    } catch (e) {
        res.json({ e, message: "Item Not Found" });
    }
}

//editing menuItem PATCH Request
module.exports.editMenu = async (req, res) => {
    try {
        const { menuId } = req.params;
        const body = req.body.menuItem;
        const oldItem = await MenuItem.findById(menuId);
        const item = await MenuItem.findByIdAndUpdate(menuId, { ...body }, { new: true });
        if (req.file) {
            await cloudinary.uploader.destroy(oldItem.imageFileName);
            item.imageUrl = req.file.path;
            item.imageFileName = req.file.filename;
        }
        await item.save();
        res.json({ item, message: "Successfully Edited" })
        console.log(item);
    } catch (e) {
        res.json({ e });
    }
}

//deleting menu route
module.exports.deleteMenuItem = async (req, res) => {
    try {
        const { menuId } = req.params;
        const menuItem = await MenuItem.findByIdAndDelete(menuId);
        await cloudinary.uploader.destroy(menuItem.imageFileName);
        res.json({ menuItem, message: "Menu Deleted" });
    } catch (e) {
        res.json({ e, message: "Request Failed" });
    }
}

//rating route, //*send the body as key of "rating" and the value should be in between 1 an 5
module.exports.rating = async (req, res) => {
    try {
        const { menuId } = req.params;
        const { rating } = req.body;
        const newRating = await new Rating({ menuId, rating });
        //console.log(newRating);
        const item = await MenuItem.findById(menuId);
        item.ratings.push(newRating);
        item.populate(
            {
                path: 'ratings.rating',
                populate: {
                    path: 'rating',
                    model: 'Rating'
                }
            },
        );
        await newRating.save();
        await helpers.calculateAvgRating();
        await item.save();
        //console.log(newRating, item);
        res.json({ message: "Rating Given" });
    } catch (e) {
        res.json({ e, message: "Rating unsuccessful" });
    }
}

//Route for updating only the isAvailable status
module.exports.updateIsAvailable = async (req, res, next) => {
    try {
        const { menuId } = req.params;
        const { isAvailable } = req.body;
        //  const menuItem = await MenuItem.findOneAndUpdate({ _id: menuId }, { isAvailable : isAvailable});
       const item = await MenuItem.findById(menuId);
       item.isAvailable = isAvailable;
       await item.save()
    
        res.json({ message: "Status Updated"});
    } catch (error) {
        next(new ExpressError(error.message));
    }
}

