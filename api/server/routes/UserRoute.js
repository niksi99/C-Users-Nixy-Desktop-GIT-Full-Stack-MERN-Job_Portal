const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.get("/userProfile", 
    AuthMiddleware.IsAuthenticated,
    UserController.UserProfile);

router.get("/getAll", UserController.GetAllUsers);
module.exports = router;

