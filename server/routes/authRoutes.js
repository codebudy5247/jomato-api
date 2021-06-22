const express =require('express')
const router = express.Router();

const { signin, signupUser,signupSeller } = require ("../controllers/authController.js");

router.post("/signin", signin);
router.post("/signup-user", signupUser);
router.post("/signup-seller", signupSeller);


module.exports= router;