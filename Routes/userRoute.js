const express = require("express");
const { 
    registerUser, 
    loginUser, 
    findUser, 
    getUsers 
} = require("../Controllers/userController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save the images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});


const upload = multer({ storage: storage });

router.post('/register',upload.single('image'), registerUser );
router.post('/login', loginUser );
router.get('/find/:userId', findUser );
router.get('/', getUsers );
module.exports = router;