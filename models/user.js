const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

userSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function(password) {
    const user =  this;
    const compare = await bcrypt.compare(password, user.password); 
    return compare;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;