const channelMessagesController = require('../controller/channelMessages')
const middleware = require("../middleware/middleware")
let express = require('express')

const router = express.Router()

router.post('/new/channelmsg', channelMessagesController.createChannelsMsg )
router.post('/get/channelmsg/all', channelMessagesController.readAllChannelsMsg )
router.get('/get/channelmsg/:idChnlMSG', channelMessagesController.readOneChannelsMsg )
router.delete('/delete/channelmsg/:idChnlMSG', channelMessagesController.deleteOneChannelsMsg )
router.put('/put/channelmsg/:idChnlMSG',  channelMessagesController.updateOneChannelsMsg )





module.exports = router



