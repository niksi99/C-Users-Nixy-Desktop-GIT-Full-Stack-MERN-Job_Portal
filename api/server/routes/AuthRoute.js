const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.post("/register", AuthController.Register)
router.post("/login", AuthController.Login);
  
module.exports = router;