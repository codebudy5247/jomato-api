const mongoose = require('mongoose')

const deliveryInfo = {
    street: String,
    locality: String,
    aptName: String,
    zip: String,
    phoneNo: Number,
    lat: Number,
    lng: Number,
};
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
        formattedAddress: {
            type: String,
        },
        address: deliveryInfo,
        //Account: { type: mongoose.Types.ObjectId, required: true, ref: "Account" },
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


