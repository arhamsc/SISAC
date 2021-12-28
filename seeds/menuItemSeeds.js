const mongoose = require('mongoose');
const MenuItem = require('../models/menu_item');

const menuItem = require('./seed_files/menu_seeds');
const dbUrl = 'mongodb://localhost:27017/SISAC';

async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log("Mongo Connection Open");
    }
    catch(e) {
        console.log("Mongo Connection Failed");
        console.log(e);
    }
}
main();

const seedDB = async() => {
    await MenuItem.deleteMany({});
    for(let i=0; i<menuItem.length; i++) {
        const item = new MenuItem({
            name: menuItem[i].name,
            description: menuItem[i].description,
            rating: menuItem[i].rating,
            price: menuItem[i].price,
            imageUrl: menuItem[i].imageUrl,
            imageFileName: menuItem[i].imageFileName
        });
        await item.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});