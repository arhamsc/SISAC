const MenuItem = require('../models/menu_item');



module.exports.getMenu = async(req,res) => {
    try {
        const items = await MenuItem.find({});
        res.json(items);
    } catch(e) {
        res.json(err);
    }
}

//*send json in type of menuItem[name]
module.exports.newMenu = async(req, res) => {
    try {
        const body = req.body.menuItem;
        const newItem = await new MenuItem(body);
        newItem.imageUrl = req.file.path;
        newItem.imageFileName = req.file.filename;
        await newItem.save();
        res.json({newItem, message: "Item added"});
    } catch(error) {
        res.json(error);
    }
}

