const mongoose = require('mongoose')


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        PhoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        Role: {
            type: String,
            enum: ["user", "admin", "seller"],
            default: "user",
        },
        avatar: {
            type: String,
            default:
                "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
        },

    },
    {
        timestamps: true,
    }
)


User = mongoose.model('User', userSchema)
module.exports = User;


