const middleware = require("../middleware/middleware")

const rolesController = require('../controller/roles')

let express = require('express')

const router = express.Router()

router.post('/new/roles', middleware.middleware,rolesController.createRoles )
router.get('/get/roles/all', middleware.middleware,rolesController.readAllRoles )
router.get('/get/roles/:idRole', middleware.middleware,rolesController.readOneRoles )
router.delete('/delete/roles/:idRole', middleware.middleware,rolesController.deleteOneRoles )
router.put('/put/roles/:idRole', middleware.middleware,rolesController.updateOneRoles )





module.exports = router



