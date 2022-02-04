const MenuItem = require("../../models/cafetaria/menu_item");
const Rating = require("../../models/cafetaria/rating");
const helpers = require("../../middleWare/helpers.js");
const { cloudinary } = require("../../cloudinary");
const { ExpressError } = require("../../middleWare/error_handlers");
const RecommendedItem = require("../../models/cafetaria/recommended_item");

//get whole menu controller
module.exports.getMenu = async (req, res, next) => {
  try {
    const items = await MenuItem.find({});
    res.json({ ...items });
  } catch (error) {
    next(new ExpressError("Failed to fetch items", 404));
  }
};

//*send json in type of menuItem[name]
module.exports.newMenuItem = async (req, res, next) => {
  try {
    const body = req.body.menuItem;
    if (!body) throw new ExpressError("Body cannot be empty", 400);
    const newItem = await new MenuItem(body);
    newItem.imageUrl = req.file.path;
    newItem.imageFileName = req.file.filename;
    await newItem.save();
    res.json({ newItem, message: "Item added" });
  } catch (error) {
    next(new ExpressError("Failed to create an items"));
  }
};

//get single item
module.exports.getMenuItem = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const item = await MenuItem.findById(menuId);
    res.json({ item, message: "Item Found" });
  } catch (e) {
    next(new ExpressError("Item does not exist", 404));
  }
};

//editing menuItem PATCH Request
module.exports.editMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const body = req.body.menuItem;
    const oldItem = await MenuItem.findById(menuId);
    if (!oldItem) {
      return next(new ExpressError("Item not found", 404));
    }
    const item = await MenuItem.findByIdAndUpdate(
      menuId,
      { ...body },
      { new: true }
    );
    if (req.file) {
      await cloudinary.uploader.destroy(oldItem.imageFileName);
      item.imageUrl = req.file.path;
      item.imageFileName = req.file.filename;
    }
    await item.save();
    res.json({ item, message: "Successfully Edited" });
  } catch (e) {
    next(new ExpressError("Failed to edit", 404));
  }
};

//deleting menu route
module.exports.deleteMenuItem = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const menuItem = await MenuItem.findByIdAndDelete(menuId);
    if (!menuItem) {
      next(new ExpressError("Could not find menuItem", 404));
    }
    await cloudinary.uploader.destroy(menuItem.imageFileName);
    res.json({ menuItem, message: "Menu Deleted" });
  } catch (e) {
    next(new ExpressError("Failed to delete"));
  }
};

//rating route, //*send the body as key of "rating" and the value should be in between 1 an 5
module.exports.rating = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const { rating } = req.body;
    const newRating = await new Rating({ menuId, rating });
    //console.log(newRating);
    const item = await MenuItem.findById(menuId);
    if (!item) {
      next(new ExpressError("Could not find menuItem", 404));
    }
    item.ratings.push(newRating);
    item.populate({
      path: "ratings.rating",
      populate: {
        path: "rating",
        model: "Rating",
      },
    });
    await newRating.save();
    await helpers.calculateAvgRating();
    await item.save();
    //console.log(newRating, item);
    res.json({ message: "Rating Given" });
  } catch (e) {
    next(new ExpressError("Rating unsuccessful", 400));
  }
};

//Route for updating only the isAvailable status
module.exports.updateIsAvailable = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const { isAvailable } = req.body;
    const item = await MenuItem.findById(menuId);
    if (!item) {
      next(new ExpressError("Could not find menuItem", 404));
    }
    item.isAvailable = isAvailable;
    await item.save();

    res.json({ message: "Status Updated" });
  } catch (error) {
    next(new ExpressError(error.message));
  }
};

/* Todays Recommendation Route */

module.exports.getRecommendation = async (req, res, next) => {
  try {
    await helpers.calculateRecommendation();
    const recoms = await RecommendedItem.find({});
    const recomsObj = helpers.objectResponseWIthIdKey(recoms);
    res.json(recomsObj);
  } catch (error) {
    next(new ExpressError(error.message));
  }
};
