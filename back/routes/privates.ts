const middleware = require("../middleware/middleware")

const privatesController = require('../controller/privates')

let express = require('express')

const router = express.Router()

router.post('/new/privates', middleware.middleware,privatesController.createPrivates )
router.get('/get/privates/all', middleware.middleware,privatesController.readAllPrivates )
router.get('/get/privates/:idPrivate', middleware.middleware, privatesController.readOnePrivates )
router.delete('/delete/privates/:idPrivate', middleware.middleware,privatesController.deleteOnePrivates )
router.put('/put/privates/:idPrivate', middleware.middleware,privatesController.updateOnePrivates )





module.exports = router



