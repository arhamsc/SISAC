const mongoose = require("mongoose");
const dbUrl = 'mongodb://localhost:27017/SISAC';
const User = require('../models/user');
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
    await User.deleteMany({});
    const user = new User({
        username: "arhamTest",
        password: "dash"
    });
    await user.save();
}

seedDb().then(()=> {
    mongoose.connection.close();
});