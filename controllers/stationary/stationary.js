//stationary controllers.
const Availability = require('../../models/stationary/availability');

const {ExpressError} = require('../../middleWare/error_handlers');

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