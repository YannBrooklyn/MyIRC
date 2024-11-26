const middleware = require("../middleware/middleware")

const usersController = require('../controller/users')

let express = require('express')

const router = express.Router()

router.post('/new/users', usersController.createUsers )
router.get('/get/users/all', usersController.readAllUsers )
router.get('/get/users/:idUser',  usersController.readOneUsers )
router.delete('/delete/users/:idUser',  usersController.deleteOneUsers )
router.put('/put/users/:idUser',  usersController.updateOneUsers )
router.post('/login/users/', usersController.loginUsers )





module.exports = router



