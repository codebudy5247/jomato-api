const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel.js");
const Account = require("../models/Accounts.js")
const Seller = require("../models/sellerModel.js")

//User Signup
exports.signupUser = async (req, res) => {
  const {
    name,
    email,
    password,
    avatar
  } = req.body;


  //console.log(req.body);
  try {
    let user = await User.findOne({
      email
    });
    if (user) {
      return res.status(400).json({
        msg: "User already exixst"
      });
    }
    newuser = new User({
      name,
      email,
      password,
      avatar
    });
    const salt = await bcrypt.genSalt(10);
    newuser.password = await bcrypt.hash(password, salt);
    const data = await newuser.save();
    console.log(data);
    const payload = {
      id: newuser.id,
      name: newuser.name,
      Role: newuser.role,
      avatar: newuser.avatar
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET, {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        console.log(token);
        res.json({
          token,
          data
        });
      }
    );
    const newAccount = new Account({
      name: newuser.name,
      avatar: newuser.avatar,
      email: newuser.email,
      password: newuser.password,
      Role: newuser.Role,
      createdBy: newuser.id,
    });
    const data1 = await newAccount.save();
    console.log(data1);

  } catch (error) {
    console.log(error);
    res.status(401);
  }

};



//Seller Signup
exports.signupSeller = async (req, res) => {
  //const arrayFiles = req.files.map((file) => file.path);
  const imageUrl = req.body.imageUrl
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const tags = req.body.tags;
  //const payment = req.body.payment;
  //const paymentArray = payment.split(" ");
  const minOrderAmount = req.body.minOrderAmount;
  const costForOne = req.body.costForOne;
  const phoneNo = req.body.phoneNo;
  const street = req.body.street;
  const aptName = req.body.aptName;
  const formattedAddress = req.body.formattedAddress;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const locality = req.body.locality;
  const zip = req.body.zip;

  try {
    let seller = await Seller.findOne({
      email
    });
    if (seller) {
      return res.status(400).json({
        msg: "Seller already exixst"
      });
    }
    newseller = new Seller({
      name: name,
      email:email,
      password:password,
      //avatar:avatar,
      tags: tags,
      imageUrl: imageUrl,
      minOrderAmount: minOrderAmount,
      costForOne: costForOne,
      //account: savedAccount,
      //payment: paymentArray,
      formattedAddress: formattedAddress,
      address: {
        street: street,
        zip: zip,
        phoneNo: phoneNo,
        locality: locality,
        aptName: aptName,
        lat: lat,
        lng: lng,
      },
      Role: "seller"
    });
    const salt = await bcrypt.genSalt(10);
    newseller.password = await bcrypt.hash(password, salt);
    const data = await newseller.save();
    console.log(data);
    const payload = {
      id: newseller.id,
      name: newseller.name,
      Role: newseller.role,
      avatar: newseller.avatar
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET, {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        console.log(token);
        res.json({
          token,
          data
        });
      }
    );
    const newAccount = new Account({
      name: newseller.name,
      avatar: newseller.avatar,
      email: newseller.email,
      password: newseller.password,
      Role: newseller.Role,
      createdBy: newseller.id,
    });
    const data1 = await newAccount.save();
    console.log(data1);

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });

    console.log(error);
  }
}
//User Login
exports.signin = async (req, res) => {

  const {
    email,
    password
  } = req.body;

  try {
    const oldUser = await User.findOne({
      email
    });

    if (!oldUser)
      return res.status(404).json({
        message: "User doesn't exist"
      });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({
        message: "Invalid credentials"
      });

    const token = jwt.sign({
        name: oldUser.name,
        id: oldUser._id,
        Role: oldUser.Role
      },
      process.env.JWT_SECRET, {
        expiresIn: "11h",
      }
    );

    res.status(200).json({
      result: oldUser,
      token
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }



}