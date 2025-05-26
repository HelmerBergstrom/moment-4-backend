const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true 
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
}); 

// Kryptera lösenord.
UserSchema.pre("save", async function(next) {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPass = await bcrypt.hash(this.password, 10)
            this.password = hashedPass;
        }

        next();
    } catch(error) {
        next(error)
    };
});

// Jämför lösenord.
UserSchema.methods.comparePass = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch(error) {
         throw error;
    }
};

const User = mongoose.model("Users", UserSchema);
module.exports = User;