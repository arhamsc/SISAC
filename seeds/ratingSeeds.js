const mongoose = require("mongoose");
const dbUrl = 'mongodb://localhost:27017/SISAC';
const Rating = require('../models/rating');
//mongoose database setup
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

const seedDb = async() => {
 await Rating.deleteMany({});
    for(let i=0; i<4; i++) {
        const item = new Rating({
            menuId: "61cc3c0b267ba6bba93c4d48",
            rating: Math.floor(Math.random() * 5) + 1
        });
        await item.save();
    }
}

seedDb().then(()=> {
    mongoose.connection.close();
})