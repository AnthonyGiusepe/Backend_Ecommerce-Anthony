const express = require('express');
const router = express.Router()
// const { getUsers } = require('../controllers/user.controllers');
const userControllers = require('../controllers/user.controllers');
const validation = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const uploadUser = require('../middlewares/uploadFileUser')

router.get('/users', validation, userControllers.getUsers)

router.post('/users', uploadUser, userControllers.createUser)

router.get("/users/:id", [validation], userControllers.getUserById)

router.delete("/users/:id", [validation, isAdmin], userControllers.deleteUser)

router.put("/users/:id", [validation, uploadUser], userControllers.updateUser)

router.post("/login", userControllers.login)

module.exports = router