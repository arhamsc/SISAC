const Rating = require('./models/rating');
const mongoose = require("mongoose");
const dbUrl = 'mongodb://localhost:27017/SISAC';
const{calculateAvgRating} = require('./middleWare/helpers');
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


// Rating.aggregate([
//     {
//         $group: {
//             _id: {menuId: "$menuId"},
//             avgRating: {$avg: "$rating"}
//         }
//     }
// ]).then((res)=> {console.log(res[0].avgRating)}).catch((err)=>{console.log(err)})

calculateAvgRating();

mongoose.connection.close();
