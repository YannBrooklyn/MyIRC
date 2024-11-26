const channelsController = require('../controller/channels')

let express = require('express')
const middleware = require("../middleware/middleware")
const router = express.Router()

router.post('/new/channels',channelsController.createChannels )
router.get('/get/channels/all', channelsController.readAllChannels )
router.get('/get/channels/:idChannel', channelsController.readOneChannels )
router.delete('/delete/channels/:idChannel', channelsController.deleteOneChannels )
router.put('/put/channels/:idChannel', channelsController.updateOneChannels )





module.exports = router